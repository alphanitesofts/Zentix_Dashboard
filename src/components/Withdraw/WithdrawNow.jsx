import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import deposit from "../Sourcefiles/Images/binance.png";
import deposit1 from "../Sourcefiles/Images/jazzcash.png";
import deposit2 from "../Sourcefiles/Images/visa.png";
import deposit3 from "../Sourcefiles/Images/easypaisa.png";
import deposit4 from "../Sourcefiles/Images/pkx.png";
import bank from '../Sourcefiles/Images/Bank.jpg'

const WithdrawNow = () => {

  return (
    <div className="content-wrapper scroll-view-two scrollbar-secondary-two">
      <h2 className="p-3" style={{ color: "#5e5873" }}><b>Wallet</b></h2>
      {/* <div className="card m-3 shadow-lg bg-body card-styles">
        <div className="card-body">
          <strong>Balance</strong>
          <hr className="w-100" />
          <h1>
            PKR <span className="text-danger">990</span>
          </h1>
        </div>
      </div> */}

      <div className="card m-3 shadow-lg bg-body rounded card-styles mb-5">
        <div className="card-body">
          <h4>Withdraw Via</h4>

          <div className="row ">

            <div className="col-lg-4">
              <div className="containerx">
                <div className="cardx mt-2 mb-2 bg-oval1">
                  <Link className="text-dark" state={{ accType: "Bank", accSubType: "" }} to="/WithdrawForm" >
                    <div className="imgBx">
                      <img src={bank} style={{ borderRadius: '20px', height: '160px', width: '260px' }} alt="nike-air-shoe" />
                    </div>
                    <div className="contentBx">
                      <h2>Bank</h2>
                      <a className="done">
                        Withdraw Now
                      </a>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="containerx">

                <div className="cardx mt-2 mb-2 bg-oval2">
                  <Link className="text-dark" state={{ accType: "JazzCash", accSubType: "JazzCash" }} to="/WithdrawForm" >
                    <div className="imgBx">
                      <img src={deposit1} alt="nike-air-shoe" />
                    </div>
                    <div className="contentBx">
                      <h2>JazzCash</h2>
                      <a className="done">
                        Withdraw Now
                      </a>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="containerx">
                <div className="cardx mt-2 mb-2 bg-oval3">
                  <Link to="/WithdrawForm" state={{ accType: "EasyPaisa", accSubType: "EasyPaisa" }}>
                    <div className="imgBx">
                      <img src={deposit3} alt="nike-air-shoe" />
                    </div>
                    <div className="contentBx">
                      <h2>EasyPaisa</h2>
                      <a className="done text-dark">
                        Withdraw Now
                      </a>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WithdrawNow;
