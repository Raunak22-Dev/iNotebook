import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification"; // Import the Notification component

const Login = () => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: "", type: "",trigger: 0  }); // State for notifications

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
                setNotification({ message: "Login successful", type: "success",});
                localStorage.setItem('token', data.token); // Save token
                setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
            } else {
                setNotification({ message: data.error || "Login failed", type: "error",trigger: Date.now() });
            }
        } catch (error) {
            setNotification({ message: "Login request error", type: "error",trigger: Date.now() });
        }
    };

    return (
        <>
        {/* Render Notification component when there's a notification */}
        {notification.message && <Notification message={notification.message} type={notification.type} trigger={notification.trigger} />}

        <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-50px" }}>
    <form onSubmit={handleSubmit} className="w-50 p-5 shadow-lg rounded-3 border border-muted bg-light">
        <h2 className="text-center mb-4">Login</h2>

        <div className="mb-4">
            <label htmlFor="email" className="form-label fs-5">Email address</label>
            <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                placeholder="Enter your email"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="password" className="form-label fs-5">Password</label>
            <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
            />
        </div>

        {/* Links in the same row, not centered */}
        <div className="d-flex justify-content-between mb-4">
            <a href="/" className="text-decoration-none text-primary fs-6">
                Forgot Password?
            </a>
            <a href="/signup" className="text-decoration-none text-primary fs-6">
                Create acount
            </a>
        </div>

        <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fs-5">
            Sign In
        </button>
    </form>
</div>

        </>
    );
};

export default Login;
