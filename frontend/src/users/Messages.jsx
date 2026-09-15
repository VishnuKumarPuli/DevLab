
import { useEffect, useState } from "react";
import {
    getClientMessages,
    markClientMessageAsRead,
} from "../services/api";

import "../styles/user-messages.css";

function Messages() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadMessages = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getClientMessages();

            setMessages(data);

        } catch (err) {

            console.error("Error loading messages:", err);

            setError(
                err.message || "Unable to load messages"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const handleMarkAsRead = async (id) => {

        try {

            await markClientMessageAsRead(id);

            setMessages((previousMessages) =>
                previousMessages.map((message) =>
                    message.id === id
                        ? {
                              ...message,
                              isRead: true,
                          }
                        : message
                )
            );

        } catch (err) {

            console.error(
                "Error marking message as read:",
                err
            );
        }
    };

    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        return new Date(date).toLocaleString();
    };

    return (
        <div className="user-messages-page">

            <div className="messages-header">

                <div>
                    <h1>Messages</h1>

                    <p>
                        Messages and updates from the DevLab team
                    </p>
                </div>

                <div className="messages-count">
                    {messages.filter(
                        (message) => !message.isRead
                    ).length}{" "}
                    Unread
                </div>

            </div>


            {loading && (
                <div className="messages-state">
                    <p>Loading messages...</p>
                </div>
            )}


            {!loading && error && (
                <div className="messages-state error">
                    <p>{error}</p>

                    <button onClick={loadMessages}>
                        Try Again
                    </button>
                </div>
            )}


            {!loading &&
                !error &&
                messages.length === 0 && (

                    <div className="messages-state empty">

                        <div className="empty-icon">
                            💬
                        </div>

                        <h2>No messages yet</h2>

                        <p>
                            You will see messages from the
                            DevLab team here.
                        </p>

                    </div>
                )}


            {!loading &&
                !error &&
                messages.length > 0 && (

                    <div className="messages-list">

                        {messages.map((message) => (

                            <div
                                key={message.id}
                                className={`message-card ${
                                    message.isRead
                                        ? "read"
                                        : "unread"
                                }`}
                            >

                                <div className="message-card-top">

                                    <div className="message-icon">
                                        💬
                                    </div>

                                    <div className="message-info">

                                        <h2>
                                            {message.subject}
                                        </h2>

                                        <span>
                                            {formatDate(
                                                message.createdAt
                                            )}
                                        </span>

                                    </div>

                                    {!message.isRead && (
                                        <span className="unread-badge">
                                            New
                                        </span>
                                    )}

                                </div>


                                <div className="message-content">

                                    <p>
                                        {message.message}
                                    </p>

                                </div>


                                {!message.isRead && (

                                    <div className="message-actions">

                                        <button
                                            onClick={() =>
                                                handleMarkAsRead(
                                                    message.id
                                                )
                                            }
                                        >
                                            Mark as Read
                                        </button>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>
                )}

        </div>
    );
}

export default Messages;
