import React, { useState } from "react";

export default function Signup({ switchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
      
        if (res.status === 409 || (data.message && data.message.includes("exist"))) {
          alert("Signup Failed! This email is already registered");
        } else if (res.status === 400) {
          alert("Signup Failed! Please check your information");
        } else {
          alert(data.message || "Signup Failed");
        }
        return;
      }

      
      alert("Signup successful! Please login.");
      switchPage("login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup Failed! Please try again");
    }
  };

  return (
    <div className="container" id="signupPage">
      <div className="login-container">
        <h1>Sign Up</h1>
        <p className="login-subtitle">Create a new account</p>
        <form onSubmit={handleSignup}>
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
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              required 
              value={confirm} 
              onChange={(e) => setConfirm(e.target.value)} 
            />
          </div>
          <button type="submit" className="sign-in-btn">Sign Up</button>
          <p>
            <a href="#" className="back-to-login" onClick={() => switchPage("login")}>
              Back to login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}