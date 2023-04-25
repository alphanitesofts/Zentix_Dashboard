import React, { useEffect, useState } from "react";
import baseUrl from "../Sourcefiles/BaseUrl";
import axios from "axios";
import baseUrlImage from "../Sourcefiles/BaseUrlImages";

const WithdrawSheet = () => {
  const [userData, setUserData] = useState([])
  const [totalWithdrawal, setTotalWithdrawal] = useState('')
  const [loader, setLoader] = useState(false)

  const [status, setStatus] = useState("");
  const [amount, setUserAmount] = useState("");
  const [depositDate, setDepositDate] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    SetLocalLogin()
  }, [])

  async function SetLocalLogin() {

    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        getData(parsed_user.id);


      }
    } catch {
      return null;
    }
  };

  const filteredData =
    status && !amount && !userName && !depositDate
      ? userData.filter((objects) => objects.status === status)
      : amount && !status && !userName && !depositDate
        ? userData.filter((objects) => objects.requested_amount === amount)
        : userName && !status && !amount && !depositDate
          ? userData.filter((objects) => objects.account_title === userName)
          : depositDate && !status && !userName && !amount
            ? userData.filter((objects) => objects.Idate === depositDate)
            : status && amount && !userName && !depositDate
              ? userData.filter((objects) => objects.status === status && objects.requested_amount == amount)
              : status && !amount && userName && !depositDate
                ? userData.filter((objects) => objects.status === status && objects.account_title == amount)
                : status && !amount && !userName && depositDate
                  ? userData.filter((objects) => objects.status === status && objects.Idate == amount)
                  //  sequence 2
                  : !status && amount && userName && !depositDate
                    ? userData.filter((objects) => objects.requested_amount === amount && objects.account_title == userName)
                    : !status && amount && !userName && depositDate
                      ? userData.filter((objects) => objects.requested_amount === amount && objects.Idate == depositDate)
                      //  sequence 3
                      : !status && !amount && userName && depositDate
                        ? userData.filter((objects) => objects.account_title === userName && objects.Idate == depositDate)
                        //  sequence 4
                        : status && !amount && !userName && depositDate
                          ? userData.filter((objects) => objects.status === status && objects.Idate == depositDate)
                          : !status && !amount && userName && depositDate
                            ? userData.filter((objects) => objects.account_title === amount && objects.Idate == depositDate)
                            //  sequence 5
                            : status && amount && userName && !depositDate
                              ? userData.filter((objects) => objects.status === status && objects.requested_amount == amount && objects.account_title == userName)
                              : status && amount && !userName && depositDate
                                ? userData.filter((objects) => objects.status === status && objects.requested_amount == amount && objects.Idate == depositDate)
                                : status && !amount && userName && depositDate
                                  ? userData.filter((objects) => objects.status === status && objects.account_title == userName && objects.Idate == depositDate)
                                  : userData


  const getData = (id) => {
    setLoader(true)
    const orderObj = {
      user_id: id
    }

    axios.post(`${baseUrl}fetch_withdrawl_request_by_userid`, orderObj)
      .then(res => {
        setLoader(false)
        setTotalWithdrawal(res.data.Total_withdrawl)
        setUserData(res.data.data)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }


  function Content({ items }) {
    return (
      <tr>
        <td>{items.user_id}</td>
        <td>{items.account_title}</td>
        <td>{items.requested_amount}</td>
        <td>{items.account_number}</td>
        <td>{items.account_type}</td>
        <td>{items.account_subtype}</td>
        {items.status === "approved" ? <td className="text-success">{items.status}</td> : <td className="text-danger">{items.status}</td>}
        <td>{items.Idate}</td>
      </tr>
    )
  }

  const DataRender = () => {

    return (
      <>
        {
          filteredData.map((items) => {
            return (
              <Content items={items} />
            )
          }
          )
        }
      </>
    )

  }


  const loadingSection = () => {
    if (userData.length < 1) {
      return <h4 className='text-center'>No Data Available</h4>
    }
    else {
      return <DataRender />
    }
  }

  return (
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper">
        <h2 className="p-3">Withdrawals</h2>

        <div className="card m-3 bg-body card-styles">
          <div className="card-body d-flex">
            <h4 className="mt-2">Total Withdrawals</h4>
            <h1 className="ms-auto">
              Pkr <span className="text-danger">{totalWithdrawal}</span>
            </h1>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-styles">
                  <div className="card-header">
                    <h3 className="card-title">
                      <b>Withdraw Sheet</b>
                    </h3>
                  </div>

                  <div className="card-body table-responsive">
                    <div className="row">
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-select col-lg-3 mb-2"
                        style={{ borderRadius: "10em" }}
                        aria-label="Default select example"
                      >
                        <option value={""}>All</option>
                        <option value={"approved"}>Approved</option>
                        <option value={"rejected"}>unapproved</option>
                      </select>

                      <input
                        className="form-control col-lg-3 mb-2"
                        type="number"
                        placeholder="Search with Amount"
                        onChange={(e) => {
                          setUserAmount(e.target.value);
                        }}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />

                      <input
                        className="form-control col-lg-3 mb-2"
                        type="text"
                        placeholder="Search with Name"
                        onChange={(e) => setUserName(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />

                      <input
                        className="form-control col-lg-3 mb-2"
                        type="text"
                        placeholder="Enter date in YYYY-MM-DD"
                        onChange={(e) => setDepositDate(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                    </div>
                    <table
                      id="example2"
                      className="table  table-bordered table-hover  "
                    >
                      {

                        loader === true ?
                          <>
                            <div className=''>
                              <div className="loader">
                                <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            </div>
                          </>
                          :
                          <>
                            <thead className="table-success mt-2">
                              <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Account No</th>
                                <th>Account Type</th>
                                <th>Account Subtype</th>
                                <th>status</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                loadingSection()
                              }
                            </tbody>
                          </>
                      }
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WithdrawSheet;
