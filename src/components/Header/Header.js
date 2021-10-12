import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import header from "../../images/header.png";
import logo from "../../images/icons/logo.png";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { logOut, user, auth } = useAuth();
  return (
    <div
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})`,
      }}
      className="header"
    >
      <nav className="nav">
        <ul>
          <li>
            <img className="logo" src={logo} alt="" />
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          {!user.email && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <Link className="btn-book" to="/book">
              Book
            </Link>
          </li>

          {user.email && (
            <li>
              <button onClick={logOut} className="btn-book logout">
                Log out{" "}
                <span className="px-1">
                  {user.displayName == null ? "" : user.displayName}{" "}
                </span>
              </button>
            </li>
          )}
        </ul>
      </nav>
      <div className="title-container">
        <h1>Burj Al Arab</h1>
        <h2>A global icon of Arabian luxury</h2>
      </div>
    </div>
  );
};

export default Header;
