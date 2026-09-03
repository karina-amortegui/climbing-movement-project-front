import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("http://localhost:8787/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    navigate("/movements");
  }

  return (
    <section className="login-page">
      <div className="login-heading">

        <h1>Admin Portal</h1>
        <p>Secure administrator access</p>
      </div>

      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-field">
          <div className="login-label-row">
            <label htmlFor="username">Username</label>
            <span>Required</span>
          </div>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Enter username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-field">
          <div className="login-label-row">
            <label htmlFor="password">Password</label>
            <span>Required</span>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="login-error" role="alert">
            {errorMessage}
          </p>
        )}

        <button className="login-submit" type="submit">
          Sign In
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
};