import React, { useState } from "react";

export default function Login({ switchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
       
        if (res.status === 401 || res.status === 400) {
          alert("Login Failed! Please check your Email or Password");
        } else {
          alert(data.message || "Login Failed");
        }
        return;
      }

      
      localStorage.setItem("token", data.token);
      switchPage("dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login Failed! Please check your Email or Password");
    }
  };

  return (
    <div className="container" id="loginPage">
      <div className="login-container">
        <h1>Login</h1>
        <p className="login-subtitle">Log in to your account</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => {
                  const input = document.querySelector("input[type='password']");
                  input.type = input.type === "password" ? "text" : "password";
                }}
              >
                👁
              </button>
            </div>
          </div>
          <a href="#" className="forgot-password">Forgot Password?</a>
          <button type="submit" className="sign-in-btn">Sign in</button>
          <p>
            <a href="#" className="sign-up" onClick={() => switchPage("signup")}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
