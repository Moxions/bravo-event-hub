import React, { useState } from "react";
import { signUp, signIn } from "./auth";

function TestAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "400px",
        margin: "auto",
        fontFamily: "Arial",
      }}
    >
      <h2>Bravo Event Hub - Test Auth</h2>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
      </div>

      <div>
        <button
          onClick={async () => {
            const result = await signUp(email, password);
            if (result.success) {
              setMessage("[SUCCESS] Account created successfully!");
              alert("Account created successfully!");
            } else {
              setMessage("[ERROR] " + result.error);
              alert("Error: " + result.error);
            }
          }}
          style={{
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            background: "blue",
            color: "white",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </div>

      <div>
        <button
          onClick={async () => {
            const result = await signIn(email, password);
            if (result.success) {
              setMessage("[SUCCESS] Login successful!");
              alert("Login successful!");
            } else {
              setMessage("[ERROR] " + result.error);
              alert("Error: " + result.error);
            }
          }}
          style={{
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            background: "green",
            color: "white",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default TestAuth;
