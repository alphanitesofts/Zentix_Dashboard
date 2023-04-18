import React, { useEffect, useState } from "react";
import baseUrl from "../Sourcefiles/BaseUrl";
import axios from "axios";

const WithdrawSheet = () => {
  const [userData, setUserData] = useState([])

  const [loader, setLoader] = useState(false)

  const [status, setStatus] = useState("")
  const [orderID, setOrderID] = useState("");
  const [orderDate, setOrderdate] = useState("");
  const [phoneNo, setPhoneNo] = useState("");


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

  const filteredData = orderID && !phoneNo && !orderDate ?
    userData.filter((objects) => objects.payer_id === (orderID)) :
    phoneNo && !orderID && !orderDate ?
      userData.filter((objects) => objects.account_title === phoneNo) :
      orderDate && !orderID && !phoneNo ?
        userData.filter((objects) => objects.ldate === orderDate) :
        orderID && phoneNo && !orderDate ?
          userData.filter((objects) => objects.payer_id === (orderID) && objects.account_title == phoneNo) :
          phoneNo && orderDate && !orderID ?
            userData.filter((objects) => objects.account_title === phoneNo && objects.ldate == orderDate) :
            orderID && phoneNo && orderDate ?
              userData.filter((objects) => objects.payer_id === (orderID) && objects.account_title === phoneNo && objects.ldate === orderDate) :
              userData


  const getData = (id) => {
    setLoader(true)
    const orderObj = {
      user_id: id
    }

    axios.post(`${baseUrl}fetch_withdrawl_request_by_userid`, orderObj)
      .then(res => {
        setLoader(false)
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
                    <div className="form-group d-flex">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Search with order ID"
                        onChange={(e) => {
                          setOrderID(e.target.value);
                        }}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search with Phone"
                        onChange={(e) => setPhoneNo(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter date in YYYY-MM-DD"
                        onChange={(e) => setOrderdate(e.target.value)}
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
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Account No</th>
                                <th>Account Type</th>
                                <th>Account Subtype</th>
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
