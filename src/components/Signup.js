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
    const [notification, setNotification] = useState({ message: "", type: "",trigger: 0 }); // State for notifications
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setNotification({ message: "Passwords do not match", type: "error",trigger: Date.now() });
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
                setNotification({ message: data.error || "Signup failed", type: "error",trigger: Date.now() });
            }
        } catch (error) {
            setNotification({ message: "Signup request error", type: "error",trigger: Date.now() });
        }
    };

    return (
        <>
            {notification.message && <Notification message={notification.message} type={notification.type} trigger={notification.trigger} />}
            {/* Render Notification component when there's a notification */}

            <div 
    className="d-flex justify-content-center align-items-center" 
    style={{ minHeight: "100vh", marginTop: "0" }} // Adjusted layout for centered design without unnecessary negatives
>
    <form 
        onSubmit={handleSubmit} 
        className="w-50 p-5 shadow-lg rounded-3 border border-muted bg-light mt-3"
    >
        <h2 className="text-center mb-4">Sign Up</h2>

        {/* User Name Field */}
        <div className="mb-3">
            <label htmlFor="userName" className="form-label fs-5">User Name</label>
            <input
                type="text"
                className="form-control"
                id="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
            />
        </div>

        {/* Email Address Field */}
        <div className="mb-3">
            <label htmlFor="email" className="form-label fs-5">Email address</label>
            <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
            />
        </div>

        {/* Password Field */}
        <div className="mb-3">
            <label htmlFor="password" className="form-label fs-5">Password</label>
            <input
                type="password"
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
            />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fs-5">Confirm Password</label>
            <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
            />
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="form-check mb-3">
            <input
                type="checkbox"
                className="form-check-input"
                id="termsCheck"
                required
            />
            <label className="form-check-label fs-6" htmlFor="termsCheck">
                I agree to the Terms and Conditions
            </label>
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            className="btn btn-success w-100 py-2 fs-5"
        >
            Sign Up
        </button>
    </form>
</div>


        </>
    );
};

export default Signup;
