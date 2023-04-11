import React, { useEffect, useState} from "react";
import baseUrl from "../Sourcefiles/BaseUrl";
import axios from "axios";

const DepositSheet = () => {

  const [userData, setUserData] = useState([])

  const [loader, setLoader] = useState(false)

  const [status, setStatus] = useState("")
  const [orderID, setOrderID] = useState("");
  const [orderDate, setOrderdate] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [uid, setUid] = useState();


  useEffect(() => { 
  
    // getData()
    SetLocalLogin()
  
  }, 
    []
    
    )

    
  async function SetLocalLogin() {

    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        getData(parsed_user.id);
        // setRoleID(parsed_user)
      }
    } catch {
      return null;
    }
  };



  const getData = (id) => {
    // alert(id)
    setLoader(true)
    const orderObj = {
      payer_id: id
    }

    axios.post(`${baseUrl}fetchdepositwithid`, orderObj)
      .then(res => {
        setLoader(false)
        // setUid(res.data.data)
        setUserData(res.data.data)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }



  



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









  function Content({ items }) {
    return (
      <tr>
        <td>{items.payer_id}</td>
        <td>{items.account_title}</td>
        <td>{items.amount}</td>
        <td>{items.account_no}</td>
        <td>{items.account_type}</td>
        <td>{items.account_subtype}</td>
        <td>{items.proof_image}</td>
        <td>{items.status}</td>
        <td>{items.Idate}</td>
      </tr>
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


  // filters condition
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





  return (
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper">
        <h2 className="p-3" style={{ color: "#5e5873" }}><b>Deposits</b></h2>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card border-danger card-styles">
                  <div className="card-header">
                    <h3 className="card-title">
                      <b>Deposits Sheet</b>
                    </h3>
                  </div>

                  <div className="card-body table-responsive">
                    <div className="row">
                      <select onChange={(e) => setStatus(e.target.value)} className="form-select col-lg-3 mb-2" style={{ borderRadius: "10em" }} aria-label="Default select example">
                        <option>Status</option>
                        <option value={'approved'}>Approved</option>
                        <option value={'unapproved'}>unapproved</option>
                      </select>

                      <input
                        className="form-control col-lg-3 mb-2"
                        type="number"
                        placeholder="Search with order ID"
                        onChange={(e) => {
                          setOrderID(e.target.value);
                        }}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />

                      <input
                        className="form-control col-lg-3 mb-2"
                        type="text"
                        placeholder="Search with Name"
                        onChange={(e) => setPhoneNo(e.target.value)}
                        aria-label="Search"
                        style={{ borderRadius: "10em" }}
                      />

                      <input
                        className="form-control col-lg-3 mb-2"
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
                                <th>Image</th>
                                <th>Status</th>
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

export default DepositSheet;
