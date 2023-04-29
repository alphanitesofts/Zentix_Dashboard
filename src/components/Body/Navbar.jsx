import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.setItem("logIN", JSON.stringify(false));
    let login = await localStorage.getItem("logIN");
    let _login = JSON.parse(login);
    console.log(_login);
    if (_login === false) {
      navigate("/");

      setInterval(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light elevation-2">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={logOut} role="button">
              <i className="fa-solid fa-right-from-bracket" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
