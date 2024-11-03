import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:3002/api/auth/login", {
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
                console.log("Login successful");
                localStorage.setItem('token', data.token); // assuming the token is in data.token
                navigate("/"); // Navigate to the homepage after successful login
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Login request error:', error);
        }
    };
  
    return (
        <div>
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
                    <input type="password" className="form-control" id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
