import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Sourcefiles/Images/LOGOZ.jpeg";
import baseUrl from "../Sourcefiles/BaseUrlImages";

const Sidebar = () => {

  const [roleID, setRoleID] = useState("");

  useEffect(() => {
    SetLocalLogin()
  }, [])


  async function SetLocalLogin() {
    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        setRoleID(parsed_user);
      }
    } catch {
      return null;
    }
  };

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-danger elevation-0">
        <a>
          <img
            src={Logo}
            alt="Logo Img"
            style={{ height: "80px", width: '250px' }}
          />

          {/* <h1 className="text-white text-center"> <b>Zentix</b> </h1> */}
        </a>
        <div className="scroll-view-two scrollbar-secondary-two">
          <div className="sidebar">
            <div className="user-panel mt-4 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={!roleID.pro_pic ? `${baseUrl}${roleID.pro_pic}` : "dist/img/avatar.jpg"}
                  className="img-circle elevation-0"
                  alt="User Image"
                />

              </div>
              <div className="info">
                <a href="#" className="d-block">
                  <b>Welcome {roleID.firstname},</b>
                </a>
              </div>
            </div>

            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column mt-3"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white">
                    &nbsp;&nbsp;
                    <i className="fa-solid fa-home" />
                    &nbsp;&nbsp;&nbsp;
                    <p>Dashboard</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/TotalRecords" className="nav-link text-white">
                    &nbsp;&nbsp;
                    <i className="fa-solid fa-boxes-stacked" />
                    &nbsp;&nbsp;&nbsp;
                    <p>Statistics</p>
                  </Link>
                </li>


                <li className="nav-item">
                  <Link to="/DailyNotifications" className="nav-link text-white">
                    &nbsp;&nbsp;
                    <i className="fa-solid fa-bell" />
                    &nbsp;&nbsp;&nbsp;
                    <p>Daily Notifications</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ImportantLinks" className="nav-link text-white">
                    &nbsp;&nbsp;
                    <i className="fa-solid fa-paperclip" />
                    &nbsp;&nbsp;&nbsp;
                    <p>Privacy Policy</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/BuyPackages" className="nav-link text-white">
                    &nbsp;&nbsp;
                    <i className="fa-solid fa-cart-shopping" />
                    &nbsp;&nbsp;&nbsp;
                    <p>Buy Packages</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/UserReferrals" className="nav-link text-white">
                    &nbsp;&nbsp;
                    <i className="fa-solid fa-users" />
                    &nbsp;&nbsp;&nbsp;
                    <p>My Referrals</p>
                  </Link>
                </li>

                <li className="nav-item menu-close">
                  <a href="#" className="nav-link text-white">
                    &nbsp;
                    <i className="nav-icon fas fa-regular fa-sack-dollar" />
                    &nbsp;&nbsp;&nbsp;
                    <p>
                      Rewards
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/CommissionSheet"
                        href="#"
                        className="nav-link text-white"
                      >
                        <i className="far fa-solid fa-coins nav-icon" />
                        <p>Commission Sheet</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Bonus-Sheet"
                        href="#"
                        className="nav-link text-white"
                      >
                        <i className="far fa-solid fa-coins nav-icon" />
                        <p>Bonus Sheet</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/CoinSheet"
                        href="#"
                        className="nav-link text-white"
                      >
                        <i className="far fa-solid fa-coins nav-icon" />
                        <p>Coins Sheet</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item menu-close">
                  <a href="#" className="nav-link text-white">
                    &nbsp;
                    <i className="nav-icon fas fa-credit-card" />
                    &nbsp;&nbsp;&nbsp;
                    <p>
                      Deposit
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/DepositNow"
                        href="#"
                        className="nav-link text-white"
                      >
                        <i className="nav-icon fas fa-credit-card" />
                        <p>Deposit Now</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/DepositSheet"
                        href="#"
                        className="nav-link text-white"
                      >
                        <i className="nav-icon fas fa-credit-card" />
                        <p>Deposit Sheet</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item menu-close">
                  <a href="#" className="nav-link text-white">
                    &nbsp;
                    <i className="nav-icon fas fa-solid fa-cloud-arrow-down" />
                    &nbsp;&nbsp;&nbsp;
                    <p>
                      Withdraw
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/WithdrawNow"
                        href="#"
                        className="nav-link text-white"
                      >
                        <i className="nav-icon fas fa-solid fa-cloud-arrow-down" />
                        <p>Withdraw Now</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/WithdrawSheet"
                        href="#"
                        className="nav-link text-white"
                      >
                        <i className="nav-icon fas fa-solid fa-cloud-arrow-down" />
                        <p>Withdraw Sheet</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="/ViewProfile" className="nav-link text-white">
                    &nbsp;&nbsp;
                    <i className="fa-solid fa-user" />
                    &nbsp;&nbsp;&nbsp;
                    <p>Profile</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white">
                    &nbsp;&nbsp;
                    <i className="fa-solid fa-right-from-bracket" />
                    &nbsp;&nbsp;&nbsp;
                    <p>Logout</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
