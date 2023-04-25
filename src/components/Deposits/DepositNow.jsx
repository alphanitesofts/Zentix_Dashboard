import React from "react";
import { Link } from "react-router-dom";
import askari from '../Sourcefiles/Images/askari.jpg'

const DepositNow = () => {

  return (
    <div className="scroll-view-two scrollbar-secondary-two content-wrapper">
      <h2 className="p-3" style={{ color: "#5e5873" }}><b>Wallet</b></h2>
      {/* <div className="card m-3 bg-body card-styles">
        <div className="card-body">
          <b>Balance</b>
          <hr className="w-100" />
          <h1>
            <i className="fa-solid fa-dollar" /> PKR <span className="text-danger">990</span>
          </h1>
        </div>
      </div> */}

      <div className="card m-3 rounded card-styles">
        <div className="card-body">
          <p> <b>Deposit Via</b> </p>
          <div className="row ">
            <div className="col-lg-4">
              <div className="containerx">
                <div className="cardx mt-2 mb-2 bg-oval4">
                  <Link className="text-dark" state={{ accType: "Bank", accSubType: "Askari_Bank" }} to="/DepositForm" >
                    <div className="imgBx">
                      <img src={askari} style={{ borderRadius: '10px', height: '150px' }} alt="nike-air-shoe" />
                    </div>
                    <div className="contentBx">
                      <h2>Askari Bank</h2>
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
