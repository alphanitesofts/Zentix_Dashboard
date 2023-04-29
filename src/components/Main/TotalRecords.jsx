import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../Sourcefiles/BaseUrl";
import axios from "axios";

const TotalRecords = () => {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const [isInvested, setIsInvested] = useState("0")

    useEffect(() => {
        SetLocalLogin()
    }, [])

    async function SetLocalLogin() {

        try {
            let user = await localStorage.getItem("user");
            let parsed_user = JSON.parse(user);
            if (parsed_user) {
                fetchUserData(parsed_user.id);
                fetchUserState(parsed_user.id);
            }
        } catch {
            return null;
        }
    };

    const fetchUserData = (id) => {
        setLoader(true)
        const userObj = {
            user_id: id
        }
        axios.post(`${baseUrl}fetch_totals`, userObj)
            .then((res) => {
                setLoader(false)
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const fetchUserState = (id) => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`${baseUrl}fetchuserwithid/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsInvested(result.data.state)
            })
            .catch(error => console.log('error', error));
    }


    return (

        <div className='content-wrapper scroll-view-two scrollbar-secondary-two'>
            <div className='container'>
                <h2 className="p-3" style={{ color: "#5e5873" }}> <b>Total Record</b> </h2>
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
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#00BCD4 " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{isInvested === "0" ? "InActive" : data.my_code}</h4>
                                            <p className="text-end">My referral</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/UserReferrals' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-user-plus card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#5c2a9d " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{data.Total_balance} pkr</h4>
                                            <p className="text-end">Total Balance</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/DepositSheet' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-wallet card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#7367f0 " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{data.my_coins}</h4>
                                            <p className="text-end">Coins Achieved</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/WithdrawSheet' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-sack-dollar card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#7367f0 " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{data.Total_Commission}</h4>
                                            <p className="text-end">My Commission</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/WithdrawSheet' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-sack-dollar card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#7367f0 " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{data.Total_withdrawl} pkr</h4>
                                            <p className="text-end">Total Withdrawals</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/WithdrawSheet' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-sack-dollar card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#00005c " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{data.Total_investment} pkr</h4>
                                            <p className="text-end">Total Investment</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/DepositSheet' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-dollar card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#009688 " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{data.Total_deposit} pkr</h4>
                                            <p className="text-end">Total Deposit</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/DepositSheet' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-wallet card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#1e9ff2 " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{data.Total_income} pkr</h4>
                                            <p className="text-end">Total Income</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/UserReferrals' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-chart-simple card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card" style={{ backgroundColor: "#10375c  " }}>
                                        <div className="card-body text-white p-4 shadow rounded">
                                            <h4 className="text-end">{data.my_rank} Achieved</h4>
                                            <p className="text-end">My Rank</p>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/ViewProfile' className="btn btn-sm btn-light me-1 shadow-lg rounded">
                                                    View
                                                </Link>
                                            </div>
                                            <div className="icon-profiles">
                                                <i className="fa-solid fa-chart-line card-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }


            </div>
        </div>
    )
}

export default TotalRecords