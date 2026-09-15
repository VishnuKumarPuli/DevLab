
import { useEffect, useState } from "react";
import {
    getAllUsers,
    sendClientMessage,
} from "../services/api";

import "../styles/admin-client-messages.css";

function ClientMessages() {

    const [users, setUsers] = useState([]);

    const [userId, setUserId] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [sending, setSending] = useState(false);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    // Load clients
    useEffect(() => {

        const loadUsers = async () => {

            try {

                setLoadingUsers(true);

                const data = await getAllUsers();

                setUsers(data);

            } catch (err) {

                console.error(
                    "Error loading clients:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load clients"
                );

            } finally {

                setLoadingUsers(false);
            }
        };

        loadUsers();

    }, []);


    // Send message
    const handleSubmit = async (e) => {

        e.preventDefault();

        setSuccess("");
        setError("");


        if (!userId) {

            setError("Please select a client.");

            return;
        }


        if (!subject.trim()) {

            setError("Please enter a subject.");

            return;
        }


        if (!message.trim()) {

            setError("Please enter a message.");

            return;
        }


        try {

            setSending(true);

            await sendClientMessage({
                userId: userId,
                subject: subject.trim(),
                message: message.trim(),
            });


            setSuccess(
                "Message sent to client successfully."
            );

            setSubject("");
            setMessage("");
            setUserId("");

        } catch (err) {

            console.error(
                "Error sending message:",
                err
            );

            setError(
                err.message ||
                "Unable to send message"
            );

        } finally {

            setSending(false);
        }
    };


    return (
        <div className="admin-client-messages-page">

            {/* Page Header */}
            <div className="admin-client-messages-header">

                <div>
                    <h1>Client Messages</h1>

                    <p>
                        Send direct messages to your clients
                    </p>
                </div>

            </div>


            {/* Message Form */}
            <div className="client-message-form-card">

                <div className="form-card-header">

                    <div className="form-card-icon">
                        💬
                    </div>

                    <div>
                        <h2>Send Message</h2>

                        <p>
                            Send a private message to a client
                        </p>
                    </div>

                </div>


                {success && (
                    <div className="client-message-success">
                        {success}
                    </div>
                )}


                {error && (
                    <div className="client-message-error">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    {/* Client */}
                    <div className="form-group">

                        <label>
                            Select Client
                        </label>

                        <select
                            value={userId}
                            onChange={(e) =>
                                setUserId(e.target.value)
                            }
                            disabled={loadingUsers}
                        >

                            <option value="">
                                {loadingUsers
                                    ? "Loading clients..."
                                    : "Select a client"}
                            </option>

                            {users.map((user) => (

                                <option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name} — {user.email}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Subject */}
                    <div className="form-group">

                        <label>
                            Subject
                        </label>

                        <input
                            type="text"
                            placeholder="Enter message subject"
                            value={subject}
                            onChange={(e) =>
                                setSubject(e.target.value)
                            }
                            maxLength={200}
                        />

                    </div>


                    {/* Message */}
                    <div className="form-group">

                        <label>
                            Message
                        </label>

                        <textarea
                            placeholder="Write your message to the client..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            rows="7"
                        />

                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="send-client-message-btn"
                        disabled={sending}
                    >

                        {sending
                            ? "Sending..."
                            : "Send Message"}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default ClientMessages;
