import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <section className="login-page">
      <div className="login-heading">
        <h1>Admin Portal</h1>
        <p>Secure administrator access</p>
      </div>

      <LoginForm onSuccess={() => navigate("/admin/menu")} />
    </section>

  );
};

/*
  - react-hook-form
  
  function FormInput ({ inputName, type, error, errorMsg, ...rest }) {
    return (
      <div>
        <input 
          name={inputName}
          type={type}
          {...rest}
        />  
        {error && (
          <p color='error'>{errorMsg}</p>
        )}
      </div>
  }

  <FormInput 
    inputName=string
    type=password|text|number
    placeholder=string
    error={usernameError}
    errorMsg={needs to be 8 characters long}
  />
*/

