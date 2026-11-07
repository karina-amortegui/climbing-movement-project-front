import { useState, type SubmitEvent } from "react";

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8787/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      onSuccess();

    } catch {
      setErrorMessage("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

      <button className="login-submit" type="submit" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
        <span aria-hidden="true">→</span>
      </button>
    </form >
  );
};