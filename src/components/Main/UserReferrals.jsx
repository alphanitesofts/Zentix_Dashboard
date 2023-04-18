import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import baseUrl from "../Sourcefiles/BaseUrl";

const UserReferrals = () => {
  const [data, setData] = useState([])


  const [orderID, setOrderID] = useState("");
  const [orderDate, setOrderdate] = useState("");
  const [phone, setPhoneNo] = useState("");
  const [status, setStatus] = useState('')


  const [firstMember, setFirstMembers] = useState([])
  const [secondMember, setSecondMembers] = useState([])
  const [loader, setLoader] = useState(false)

  async function SetLocalLogin() {

    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        getRefferals(parsed_user.id);
        // setRoleID(parsed_user)
      }
    } catch {
      return null;
    }
  };


  const textRef = useRef(null);

  const handleCopy = () => {
    textRef.current.select();
    document.execCommand("copy");
    toast.info("Text copied")
  };


  const getRefferals = (id) => {
    setLoader(true)
    const userObj = {
      user_id: id
    }
    axios.post(`${baseUrl}get_my_team`, userObj)
      .then((res) => {
        setLoader(false)
        console.log(res)
        setData(res.data)

        setFirstMembers(res.data.first_members)
        setSecondMembers(res.data.second_members)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    SetLocalLogin();
  }, [])

  return (
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper">
        <h2 className="p-3">My Referrals</h2>

        {/* <div className="card card-styles m-3">
          <h5 className="card-header pb-4">
            <b>My Referral Name</b>
          </h5>
          <div className="card-body">
            <div className="input-group mb-3">

              <input
                type="text"
                ref={textRef}
                value={"DxFR1889"}
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
              <button
                className="input-group-text btn-success ms-2" onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          </div>
        </div> */}

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-styles">
                  {/* <div className="card-header">

                    <h3 className="card-title">
                      <b>My Referrals Users</b>
                    </h3>
                  </div> */}

                  <div className="card-body table-responsive">
                    <div>
                      <div className="row">
                        <input
                          className="form-control col-lg-4 mb-2"
                          type="number"
                          placeholder="Search with order ID"
                          onChange={(e) => {
                            setOrderID(e.target.value);
                          }}
                          aria-label="Search"
                          style={{ borderRadius: "10em" }}
                        />

                        <input
                          className="form-control col-lg-4 mb-2"
                          type="text"
                          placeholder="Search with Name"
                          onChange={(e) => setPhoneNo(e.target.value)}
                          aria-label="Search"
                          style={{ borderRadius: "10em" }}
                        />

                        <input
                          className="form-control col-lg-4 mb-2"
                          type="text"
                          placeholder="Enter date in YYYY-MM-DD"
                          onChange={(e) => setOrderdate(e.target.value)}
                          aria-label="Search"
                          style={{ borderRadius: "10em" }}
                        />
                      </div>

                    </div>


                    {
                      loader === true ?
                        <>
                          <div>
                            <div className="loader">
                              <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          </div>
                        </> :

                        <>
                          <h4 className="mt-3 mb-0">First Refferals</h4>
                          <table
                            id="example2"
                            className="table mt-2  table-bordered table-hover  "
                          >
                            <thead className="table-success">
                              <tr>
                                <th>User ID</th>
                                <th>firstname</th>
                                <th>username</th>
                                <th>email</th>
                                <th>cnic</th>
                                <th>Phone No.</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                firstMember.map((items) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{items.id}</td>
                                        <td>{items.firstname}</td>
                                        <td>{items.username}</td>
                                        <td>{items.email}</td>
                                        <td>{items.cnic}</td>
                                        <td>{items.phone}</td>
                                        <td>{items.Idate}</td>
                                      </tr>
                                    </>
                                  )
                                })
                              }
                            </tbody>
                          </table>


                          <h4 className="mt-5 mb-0">Second Refferals</h4>
                          <table
                            id="example2"
                            className="table mt-2 table-bordered table-hover  "
                          >
                            <thead className="table-success">
                              <tr>
                                <th>User ID</th>
                                <th>firstname</th>
                                <th>username</th>
                                <th>email</th>
                                <th>cnic</th>
                                <th>Phone No.</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                secondMember.map((items) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{items.id}</td>
                                        <td>{items.firstname}</td>
                                        <td>{items.username}</td>
                                        <td>{items.email}</td>
                                        <td>{items.cnic}</td>
                                        <td>{items.phone}</td>
                                        <td>{items.Idate}</td>
                                      </tr>
                                    </>
                                  )
                                })
                              }
                            </tbody>
                          </table>


                        </>

                    }




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

export default UserReferrals;
