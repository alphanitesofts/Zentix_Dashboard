import React, { useState, useEffect } from "react";
import baseUrl from "../Sourcefiles/BaseUrl";
import { toast } from "react-toastify";


const CommissionSheet = () => {

  const [userData, setUserData] = useState([])
  const [showCommission, setShowCommission] = useState('')

  const [userID, setuserID] = useState("");
  const [userDate, setuserDate] = useState("");
  const [userName, setuserName] = useState("");

  const [loader, setLoader] = useState(false)


  useEffect(() => {
    SetLocalLogin()
  }, [])

  async function SetLocalLogin() {

    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        getUserCoins(parsed_user.id);
      }
    } catch {
      return null;
    }
  };


  const getUserCoins = (id) => {
    setLoader(true)
    var formdata = new FormData();
    formdata.append("user_id", id);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${baseUrl}get_commissions`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoader(false)
        if (result.status === "401") {
          // toast.warn('No Data Available')
          console.log(result.status)
        }
        else if (result.status === "200") {
          setUserData(result.bonus_list)
          setShowCommission(result.my_total_bonus)
        }
        console.log(result)
      })
      .catch(error => {
        console.log('error', error)
      });

  }

  const loadingSection = () => {
    if (userData.length < 1) {
      return <h4 className='text-center'>No Data Available</h4>
    }
    else {
      return <DataRender />
    }
  }

  const filteredData = userID && !userName && !userDate ?
    userData.filter((objects) => objects.user_id === (userID)) :
    userName && !userID && !userDate ?
      userData.filter((objects) => objects.account_title === userName) :
      userDate && !userID && !userName ?
        userData.filter((objects) => objects.ldate === userDate) :
        userID && userName && !userDate ?
          userData.filter((objects) => objects.user_id === (userID) && objects.account_title == userName) :
          userName && userDate && !userID ?
            userData.filter((objects) => objects.account_title === userName && objects.ldate == userDate) :
            userID && userName && userDate ?
              userData.filter((objects) => objects.user_id === (userID) && objects.account_title === userName && objects.ldate === userDate) :
              userData



  const DataRender = () => {
    return (
      <>
        {
          filteredData.map((items) => {
            return (
              <Content items={items} />
            )
          }
          )}
      </>
    )
  }


  function Content({ items }) {
    return (
      <tr>
        <td>{items.id}</td>
        <td>{items.username}</td>
        <td>{items.commission}</td>
        <td>{items.commission_from}</td>
        <td>{items.commission_percentage}</td>
        <td>{items.created_at}</td>
      </tr>
    )
  }


  return (
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper">
        <h2 className="p-3" style={{ color: "#5e5873" }}><b >Commission</b></h2>

        <div className="card m-3 bg-body card-styles">
          <div className="card-body d-flex">
            <h4 className="mt-2">My Commission</h4>
            <h1 className="ms-auto">
              Pkr <span className="text-danger">{showCommission}</span>
            </h1>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-styles">
                  <div className="card-header d-flex">
                    <div>
                      <h3 className="card-title">
                        <b>My Commission Sheet</b>
                      </h3>
                    </div>


                  </div>

                  <div className="card-body table-responsive">
                    <div className="form-group d-flex">
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Search with order ID"
                        onChange={(e) => {
                          setuserID(e.target.value);
                        }}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search with Uername"
                        onChange={(e) => setuserName(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter date in YYYY-MM-DD"
                        onChange={(e) => setuserDate(e.target.value)}
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
                                <th>Username</th>
                                <th>Commission</th>
                                <th>Referred By</th>
                                <th>Transaction Type</th>
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

export default CommissionSheet;
