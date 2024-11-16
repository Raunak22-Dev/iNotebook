import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification"; // Import the Notification component

const Login = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: "", type: "" }); // State for notifications

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:3004/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: e.target.email.value,
                    password: e.target.password.value,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setNotification({ message: "Login successful", type: "success" });
                localStorage.setItem('token', data.token); // Save token
                setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
            } else {
                setNotification({ message: data.error || "Login failed", type: "error" });
            }
        } catch (error) {
            setNotification({ message: "Login request error", type: "error" });
        }
    };

    return (
        <div>
            {/* Render Notification component when there's a notification */}
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-5">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
