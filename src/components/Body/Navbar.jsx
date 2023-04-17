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
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
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
