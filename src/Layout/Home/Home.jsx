import React, { useState, useEffect } from "react";
import "./home.css";
import LOGO from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { USER_ID, PASSWORD } from "../../credentials";

export default function Home() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if credentials are already saved in local storage
    const savedCredentials = JSON.parse(localStorage.getItem("credentials"));

    if (
      savedCredentials &&
      savedCredentials.username === USER_ID &&
      savedCredentials.password === PASSWORD
    ) {
      setAuthenticated(true);
    } else {
      setOpenAuth(true);
    }
  }, []);

  const handleAuthentication = () => {
    // Check if entered credentials are valid
    if (username === USER_ID && password === PASSWORD) {
      // Save credentials to local storage
      localStorage.setItem(
        "credentials",
        JSON.stringify({ username, password })
      );
      setAuthenticated(true);
      setOpenAuth(false);
    } else {
      setError("Authentication failed. Never give up. try again.");
      setUsername("");
      setPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuthentication();
  };

  const getBillPage = (page) => {
    if (authenticated) {
      navigate(`/${page}`);
    } else {
      // Authenticate before navigating
      handleAuthentication();
    }
  };

  return (
    <div className="home">
      <img src={LOGO} alt="logo" className="home__logo" />
      <div className="home__buttons">
        <div className="products__page" onClick={() => getBillPage("products")}>
          <div className="button-content">Accessories</div>
        </div>
        <div
          className="bill__page"
          onClick={() => getBillPage("bill-with-price")}
        >
          <div className="button-content">Generate Bill</div>
        </div>
        <div className="invoice__page" onClick={() => getBillPage("invoice")}>
          <div className="button-content">Invoice</div>
        </div>
      </div>
      {openAuth && (
        <div className="modal">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
}
