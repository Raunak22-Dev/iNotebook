import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from './Notification'; // Import the Notification component

const Signup = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [notification, setNotification] = useState({ message: "", type: "" }); // State for notifications
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setNotification({ message: "Passwords do not match", type: "error" });
            return;
        }
        try {
            const response = await fetch("http://localhost:3004/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.userName,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setNotification({ message: "Signup successful", type: "success" });
                localStorage.setItem('token', data.token);
                setTimeout(() => navigate("/login"), 2000); // Redirect to login after signup
            } else {
                setNotification({ message: data.error || "Signup failed", type: "error" });
            }
        } catch (error) {
            setNotification({ message: "Signup request error", type: "error" });
        }
    };

    return (
        <div className="container">
            {/* Render Notification component when there's a notification */}
            {notification.message && <Notification message={notification.message} type={notification.type} />}

            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-5">
                    <label htmlFor="userName" className="form-label">
                        User Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
                    </label>
                </div>
                <button type="submit" className="btn btn-success">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
