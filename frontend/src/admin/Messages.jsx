
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
} from "../services/api";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  // Load messages
  const loadMessages = async () => {
    try {
      setLoading(true);

      const data = await getAllMessages();

      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Mark as read
  const markRead = async (id) => {
    try {
      await updateMessageStatus(id, "Read");

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? { ...message, status: "Read" }
            : message
        )
      );
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  // Mark as unread
  const markUnread = async (id) => {
    try {
      await updateMessageStatus(id, "Unread");

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? { ...message, status: "Unread" }
            : message
        )
      );
    } catch (error) {
      console.error("Failed to mark message as unread:", error);
    }
  };

  // Delete message
  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);

      setMessages((currentMessages) =>
        currentMessages.filter(
          (message) => message.id !== id
        )
      );
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  // Search
  const filteredMessages = messages.filter((message) => {
    const search = searchQuery.toLowerCase();

    return (
      message.name?.toLowerCase().includes(search) ||
      message.email?.toLowerCase().includes(search) ||
      message.subject?.toLowerCase().includes(search) ||
      message.message?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="admin-page">

      <div className="admin-container">

        <div className="admin-page-header">

          <div>
            <h1>Messages</h1>

            <p>
              Messages received from your website contact form.
            </p>
          </div>

        </div>

        {searchQuery && (
          <p className="admin-search-result-text">
            Search results for:{" "}
            <strong>{searchQuery}</strong>
          </p>
        )}

        {loading ? (

          <div className="admin-empty-state">
            <p>Loading messages...</p>
          </div>

        ) : filteredMessages.length === 0 ? (

          <div className="admin-empty-state">
            <p>No messages found.</p>
          </div>

        ) : (

          <div className="messages-list">

            {filteredMessages.map((message) => (

              <div
                className={`message-card ${
                  message.status === "Unread"
                    ? "message-unread"
                    : ""
                }`}
                key={message.id}
              >

                <div className="message-header">

                  <div>

                    <h3>
                      {message.subject || "No Subject"}
                    </h3>

                    <p>
                      {message.name}
                    </p>

                  </div>

                  <span>
                    {message.status}
                  </span>

                </div>

                <div className="message-content">

                  <p>
                    <strong>Email:</strong>{" "}
                    {message.email}
                  </p>

                  <p>
                    {message.message}
                  </p>

                  {message.createdAt && (
                    <small>
                      {message.createdAt}
                    </small>
                  )}

                </div>

                {/* ACTION BUTTONS */}
                <div className="message-actions">

                  {message.status === "Unread" ? (

                    <button
                      className="admin-small-button read-button"
                      onClick={() =>
                        markRead(message.id)
                      }
                      title="Mark this message as read"
                    >
                      ✓ Mark as Read
                    </button>

                  ) : (

                    <button
                      className="admin-small-button unread-button"
                      onClick={() =>
                        markUnread(message.id)
                      }
                      title="Mark this message as unread"
                    >
                      ● Mark as Unread
                    </button>

                  )}

                  <button
                    className="admin-small-button delete-button"
                    onClick={() => {

                      const confirmed = window.confirm(
                        "Are you sure you want to delete this message?"
                      );

                      if (confirmed) {
                        handleDelete(message.id);
                      }

                    }}
                    title="Delete this message"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Messages;
