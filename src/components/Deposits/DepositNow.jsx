import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import deposit from "../Sourcefiles/Images/binance.png";
import deposit1 from "../Sourcefiles/Images/jazzcash.png";
import deposit2 from "../Sourcefiles/Images/visa.png";
import deposit3 from "../Sourcefiles/Images/easypaisa.png";
import deposit4 from "../Sourcefiles/Images/pkx.png";

import meezanBank from '../Sourcefiles/Images/mezanlogo.jpg'

const DepositNow = () => {
  const unavailableDeposit = () => {
    toast.info("Binance is not available now!");
  };

  return (
    <div className="scroll-view-two scrollbar-secondary-two content-wrapper">
      <h2 className="p-3" style={{ color: "#5e5873" }}><b>Wallet</b></h2>
      <div className="card m-3 bg-body card-styles">
        <div className="card-body">
          <b>Balance</b>
          <hr className="w-100" />
          <h1>
            <i className="fa-solid fa-dollar" /> PKR <span className="text-danger">990</span>
          </h1>
        </div>
      </div>

      <div className="card m-3 rounded card-styles">
        <div className="card-body">
          <p> <b>Deposit Via</b> </p>

          <div className="row ">

            <div className="col-lg-4">
              <div className="containerx">

                <div className="cardx mt-2 mb-2 bg-oval2">
                  <Link className="text-dark" state={{ accType: "Bank", accSubType: "Meezan_Bank" }} to="/DepositForm" >
                    <div className="imgBx">
                      <img src={meezanBank} style={{ borderRadius: '10px', width: '200px' }} alt="nike-air-shoe" />
                    </div>
                    <div className="contentBx">
                      <h2>Meezan Bank</h2>
                      <a className="done">
                        Buy Now
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

export default DepositNow;
