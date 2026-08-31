import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); 

async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
  e.preventDefault();
 
  const response = await fetch("http://localhost:8787/login",
    {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify
      ({
          username: username,
          password: password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    setErrorMessage(data.message);
    return;
  }

  localStorage.setItem("token", data.token);
  navigate("/movements");
}
  return (
    <main>
      <h1>AdminLogin</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>

        <button type="submit">Sign in</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </main>
  );
};