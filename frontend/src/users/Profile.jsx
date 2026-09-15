
import { useEffect, useState } from "react";

import {
    getUserProfile,
    updateUserProfile,
} from "../services/api";

import "../styles/user-profile.css";


function Profile() {

    // ==========================================
    // PROFILE STATE
    // ==========================================

   const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    createdAt: "",
});


    // ==========================================
    // LOADING
    // ==========================================

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    // ==========================================
    // MESSAGES
    // ==========================================

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");


    // ==========================================
    // LOAD PROFILE
    // ==========================================

    const loadProfile = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getUserProfile();


           setProfile({
    id: data.id || "",
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    company: data.company || "",
    createdAt: data.createdAt || "",
});

        } catch (err) {

            console.error(
                "Error loading profile:",
                err
            );

            setError(
                err.message ||
                "Unable to load profile"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // LOAD ON PAGE OPEN
    // ==========================================

    useEffect(() => {

        loadProfile();

    }, []);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setProfile((previousProfile) => ({
            ...previousProfile,
            [name]: value,
        }));


        setSuccess("");

        setError("");
    };


    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        setSuccess("");

        setError("");


        if (!profile.name.trim()) {

            setError(
                "Name is required."
            );

            return;
        }


        try {

            setSaving(true);


            await updateUserProfile({

                name:
                    profile.name.trim(),

                phone:
                    profile.phone.trim(),

                company:
                    profile.company.trim(),
            });


            setSuccess(
                "Profile updated successfully."
            );


            // Reload latest profile
            await loadProfile();

        } catch (err) {

            console.error(
                "Error updating profile:",
                err
            );

            setError(
                err.message ||
                "Unable to update profile"
            );

        } finally {

            setSaving(false);
        }
    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }


        const parsedDate =
            new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return date;
        }


        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    // ==========================================
    // LOADING STATE
    // ==========================================

    if (loading) {

        return (
            <div className="user-profile-page">

                <div className="profile-state">

                    <div className="profile-loader">
                        Loading profile...
                    </div>

                </div>

            </div>
        );
    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="user-profile-page">

            {/* ================================
                HEADER
            ================================= */}

            <div className="profile-header">

                <div>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        Manage your personal information
                    </p>

                </div>

            </div>


            {/* ================================
                ERROR
            ================================= */}

            {error && (

                <div className="profile-alert profile-error">

                    {error}

                </div>

            )}


            {/* ================================
                SUCCESS
            ================================= */}

            {success && (

                <div className="profile-alert profile-success">

                    {success}

                </div>

            )}


            <div className="profile-layout">


                {/* ============================
                    PROFILE CARD
                ============================= */}

                <div className="profile-main-card">

                    <div className="profile-card-header">

                        <div className="profile-avatar">

                            {profile.name
                                ? profile.name
                                    .charAt(0)
                                    .toUpperCase()
                                : "U"}

                        </div>


                        <div>

                            <h2>
                                {profile.name ||
                                    "User"}
                            </h2>

                            <p>
                                {profile.email}
                            </p>

                        </div>

                    </div>


                    {/* ========================
                        FORM
                    ========================= */}

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >


                        {/* NAME */}

                        <div className="profile-form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="profile-form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                readOnly
                                className="profile-readonly"
                            />

                            <small>
                                Email cannot be changed.
                            </small>

                        </div>


                        {/* PHONE */}

                        <div className="profile-form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />

                        </div>


                        {/* COMPANY */}

                        <div className="profile-form-group">

                            <label>
                                Company
                            </label>

                            <input
                                type="text"
                                name="company"
                                value={profile.company}
                                onChange={handleChange}
                                placeholder="Enter your company name"
                            />

                        </div>


                        {/* BUTTON */}

                        <div className="profile-form-actions">

                            <button
                                type="submit"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    </form>

                </div>


                {/* ============================
                    ACCOUNT INFO
                ============================= */}

                <div className="profile-side-card">

                    <div className="profile-side-header">

                        <h2>
                            Account Information
                        </h2>

                    </div>


                    <div className="profile-info-item">

                        <span>
                            Account ID
                        </span>

                        <strong>
                            #{profile.id || "—"}
                        </strong>

                    </div>


                    <div className="profile-info-item">

                        <span>
                            Email
                        </span>

                        <strong>
                            {profile.email || "—"}
                        </strong>

                    </div>


                    <div className="profile-info-item">

                        <span>
                            Member Since
                        </span>

                        <strong>
                            {formatDate(
                                profile.createdAt
                            )}
                        </strong>

                    </div>


                    <div className="profile-info-note">

                        <span>
                            🔒
                        </span>

                        <p>
                            Your profile information is
                            private and can only be accessed
                            by your account.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Profile;
