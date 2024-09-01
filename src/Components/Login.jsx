import { useState } from "react";
import "../Styles/Login.css";
import userIcon from "../assets/user.png";
import passwordIcon from "../assets/password.png";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleButtonClick = () => {
    // const url = "http://127.0.0.1:8000/api/login";
    const url = "https://kmcianbackend.vercel.app/api/login";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(credentials),
    })
      .then(async (res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "An error occurred");
          });
        }
        return res.json();
      })
      .then((data) => {
        // if login successfull save the token 
        localStorage.setItem("kmciantoken", data.token);
        setError("Login Succesfull");
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <div className="login-container">
      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}
      <div className="login-header">
        <h4>Login</h4>
      </div>
      <div className="login-fields">
        <div className="username-container">
          <label htmlFor="username">
            <img src={userIcon} alt="user" />
          </label>
          <input
            type="text"
            placeholder="Username/Email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="password-container">
          <label htmlFor="password">
            <img src={passwordIcon} alt="password" />
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="login-button-container">
          <button onClick={handleButtonClick}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
