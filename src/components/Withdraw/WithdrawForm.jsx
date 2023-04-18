import React, { useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../Sourcefiles/BaseUrl";
import { useLocation } from "react-router-dom";
import banksInPakistan from "../Sourcefiles/Banks";
import { useEffect } from "react";

const WithdrawForm = () => {

  const location = useLocation();
  const { accType } = location.state;
  const { accSubType } = location.state;

  const [fieldStatus, setFieldStatus] = useState(false);
  const [userId, setuserId] = useState('')
  const [accountTitle, setAccountTitle] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [accountSub, setAccountSub] = useState("null")
  const [buttonLoader, setButtonLoader] = useState(false)

  useEffect(() => {
    SetLocalLogin()
  }, [])

  async function SetLocalLogin() {

    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        setuserId(parsed_user.id);
      }
    } catch {
      return null;
    }
  };

  const submitData = () => {
    // && !accountSub || accountSub === "null"
    setFieldStatus(true)
    if (!accountTitle && !accountNumber && !amount) {
      toast.warn('Please fill all fields')
    }
    else {
      if (amount <= 499) {
        toast.warn('You can withdraw minimum 500')
      }
      else {
        setButtonLoader(true)
        var formdata = new FormData();
        formdata.append("account_title", accountTitle);
        formdata.append("account_type", accType);
        formdata.append("account_number", accountNumber);
        formdata.append("requested_amount", amount);
        formdata.append("user_id", userId);
        formdata.append("account_subtype", accSubType ? accSubType : accountSub);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch(`${baseUrl}PostWithdrawl`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setButtonLoader(false)
            console.log(result)
            if (result.status === "200") {
              toast.info(result.message)
              // setInterval(() => {
              //   window.location.reload(true)
              // }, 1500);
            }
            if (result.status === "401") {
              toast.warn(result.message)
            }
          })
          .catch(error => {
            console.log('error', error)
            toast.error('Error While Withdrawing...')
          })
      }
    }
  }

  return (
    <div className="scroll-view-two scrollbar-secondary-two  content-wrapper">
      <h2 className="p-3">Withdraw Form</h2>

      <div className="card m-3 border border-danger mb-3 card-styles">
        <div className="card-header text-danger">
          <div className="d-flex">
            <div className="me-auto">
              <h5 style={{ color: "#C70039" }}>Account Name</h5>
              <p>{accountTitle}</p>
            </div>
            <div>
              <h5 style={{ color: "#C70039" }}>Account Number</h5>
              <p>{accountNumber}</p>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "15px" }}>
            Kindly Add the account number on which you want your payments to be received. </h5>
          <p className="card-text" style={{ fontSize: "15px" }}> برائے مہربانی وہ اکاؤنٹ نمبر شامل کریں جس پر آپ اپنی ادائیگیاں وصول کرنا چاہتے ہیں۔ </p>
          <p className="card-text" style={{ fontSize: "17px" }}> Our Withdraw Fee is <span className="text-danger">5%</span>
          </p>
        </div>
      </div>

      <div className="card m-3 card-styles">
        <div className="card-header">
          <h3 className="card-title pb-2">
            <b>Account Details:</b>
          </h3>
        </div>
        <div className="card-body">

          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="col-form-label" htmlFor="inputSuccess">
                  Account Title
                </label>
                <input
                  onChange={(e) => setAccountTitle(e.target.value)}
                  type="text"
                  className="form-control "
                  id="inputSuccess"
                  placeholder="Enter Account Title"
                  style={{
                    borderColor:
                      accountTitle === "" && fieldStatus === true ? "red" : "#ced4da",
                  }}
                />
                <span className="icon me-4 mt-2">
                  <i className="fa-solid fa-user" />
                </span>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="col-form-label" htmlFor="inputSuccess">
                  Account Number
                </label>
                <input
                  onChange={(e) => setAccountNumber(e.target.value)}
                  type="number"
                  className="form-control "
                  id="inputSuccess"
                  placeholder="Enter Account Number"
                  style={{
                    borderColor:
                      accountNumber === "" && fieldStatus === true ? "red" : "#ced4da",
                  }}
                />
                <span className="icon me-4 mt-2">
                  <i className="fa-solid fa-receipt" />
                </span>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="col-form-label" htmlFor="inputSuccess">
                  Account Type
                </label>
                <fieldset disabled>
                  <input
                    value={accType}
                    type="text"
                    className="form-control "
                    id="inputSuccess"
                    placeholder="Enter Account Type"
                  />
                  <span className="icon me-4 mt-2">
                    <i className="fa-solid fa-building-columns" />
                  </span>
                </fieldset>
              </div>
            </div>


            {
              accSubType ?
                <>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="inputSuccess">
                        Account Sub-Type
                      </label>
                      <fieldset disabled>
                        <input
                          value={accSubType}
                          type="text"
                          className="form-control "
                          id="inputSuccess"
                        />
                        <span className="icon me-4 mt-2">
                          <i className="fa-solid fa-building-columns" />
                        </span>
                      </fieldset>
                    </div>
                  </div>

                </> :
                <>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="col-form-label" htmlFor="inputSuccess">
                        Account Sub-type
                      </label>
                      <select onChange={(e) => setAccountSub(e.target.value)} className="form-select" style={{
                        borderColor:
                          accountSub === "" && fieldStatus === true ? "red" : "#ced4da",
                      }} aria-label="Default select example">
                        <option>Select Bank</option>
                        {
                          banksInPakistan.banks.map((items, i) => {
                            return (
                              <>
                                <option key={i}>{items.name}</option>
                              </>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div>
                </>
            }


          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="col-form-label" htmlFor="inputSuccess">
                  Enter Amount
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="form-control"
                  id="inputSuccess"
                  placeholder="Enter Deposit Amount"
                  style={{
                    borderColor:
                      amount === "" && fieldStatus === true ? "red" : "#ced4da",
                  }}
                />
                <span className="icon me-4 mt-2">
                  <i className="fa-solid fa-coins" />
                </span>
              </div>
            </div>

          </div>
          <button className="btn btn-success float-end" onClick={submitData}>
            {
              buttonLoader === true ? 'Loading...' : 'Submit'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawForm;
