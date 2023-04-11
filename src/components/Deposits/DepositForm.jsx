import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import baseUrl from "../Sourcefiles/BaseUrl";
import { useLocation } from "react-router-dom";

const DepositForm = () => {

  const location = useLocation();
  const { accType } = location.state;
  const { accSubType } = location.state;

  const [fieldStatus, setFieldStatus] = useState(false);

  const [accountTitle, setAccountTitle] = useState('')
  const [accountNumber, setAccountNumber] = useState('')

  const [amount, setAmount] = useState('')
  const [invoice, setInvoice] = useState('')
  const [transactionID, setTransactionID] = useState('')
  const [roleID, setRoleID] = useState("");


  const submitData = () => {

    setFieldStatus(true)
    if (!accountTitle && !accountNumber && !amount && !invoice && !transactionID) {
      toast.warn('Please fill all fields')
    }
    else {
      var formdata = new FormData();
      formdata.append("payer_id", roleID ? roleID.id : null);
      formdata.append("account_type", accType);
      formdata.append("account_title", accountTitle);
      formdata.append("account_no", accountNumber);
      formdata.append("amount", amount);
      formdata.append("proof_image", invoice);
      formdata.append("account_subtype", accSubType);
      formdata.append("transaction_id", transactionID);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${baseUrl}addDeposit`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          toast.info('Amount Deposited')

          setInterval(() => {
            window.location.reload(true)
          }, 1500);

        })
        .catch(error => {
          console.log('error', error)
          toast.error('Error While Depositing')
        })
    }

  }

  useEffect(() => {
    SetLocalLogin()
  }, [])


  async function SetLocalLogin() {

    console.log("called function 11")
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
    <div className="scroll-view-two scrollbar-secondary-two content-wrapper">
      <h2 className="p-3">Deposit Form</h2>

      <div className="card m-3 border border-danger mb-3 card-styles">
        <div className="card-header text-danger">
          <div className="d-flex">
            <div className="me-auto">
              <h5 style={{ color: "#C70039" }}>Account Name</h5>
              <p>Faraz Mahmood</p>
            </div>
            <div>
              <h5 style={{ color: "#C70039" }}>Account Title</h5>
              <p>03034450790</p>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "15px" }}>
            Kindly deposit amount on account number given above and after that
            fill the form Below
          </h5>
          <p className="card-text" style={{ fontSize: "15px" }}>
            برائے مہربانی اوپر دیے گئے اکاؤنٹ نمبر پر رقم جمع کریں اور اس کے بعد
            نیچے دیا گیا فارم پُر کریں۔
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
            <div className="col-sm-6">
              <div className="form-group">
                <label className="col-form-label" htmlFor="inputSuccess">
                  Account Sub-type
                </label>
                <fieldset disabled>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSuccess"
                    value={accSubType}
                    placeholder="Enter Account Sub-type"
                  />
                  <span className="icon me-4 mt-2">
                    <i className="fa-solid fa-building-columns" />
                  </span>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
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

            <div className="col-lg-6">
              <div className="form-group">
                <label className="col-form-label" htmlFor="inputSuccess">
                  Transaction ID (TID)
                </label>
                <input
                  onChange={(e) => setTransactionID(e.target.value)}
                  type="text"
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


          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="col-form-label" htmlFor="inputSuccess">
                  Upload Invoice
                </label>
                <input
                  onChange={(e) => setInvoice(e.target.files[0])}
                  style={{
                    borderColor:
                      invoice === "" && fieldStatus === true ? "red" : "#ced4da",
                  }}
                  type="file"
                  className="form-control"
                  id="inputGroupFile01"
                />
              </div>
            </div>
          </div>


          <button className="btn btn-info float-end" onClick={submitData}>Summit</button>
        </div>
      </div>
    </div>
  );
};

export default DepositForm;
