import React, { useState } from 'react'
import baseUrl from '../Sourcefiles/BaseUrl';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DailyNotifications = () => {

    const [notifications, setNotifications] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        SetLocalLogin()
    }, [])


    async function SetLocalLogin() {
        try {
            let user = await localStorage.getItem("user");
            let parsed_user = JSON.parse(user);
            if (parsed_user) {
                getNotifications(parsed_user.id);
            }
        } catch {
            return null;
        }
    };


    const getNotifications = (id) => {

        setLoader(true)
        const userObj = {
            receiver_id: id
        }
        axios.post(`${baseUrl}fetch_notification_by_rid`, userObj)
            .then((res) => {
                setLoader(false)
                if (res.data.status === "200") {
                    setNotifications(res.data.Notification)
                }
                else if (res.data.status === "401") {
                    toast.warn(res.data.message)
                    setLoader(false)

                }
                console.log(res)

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const unseenNotifications = notifications.filter(
        (notification) => notification.is_seen === "false"
    );

    return (
        <div className='scroll-view-two scrollbar-secondary-two'>
            <div className='content-wrapper '>
                <h2 className="p-3" style={{ color: "#5e5873" }}><b>Notifications</b></h2>


                {loader === true ?
                    <>
                        <div>
                            <div className="loader">
                                <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </>
                    :

                    notifications.length >= 1 &&
                    notifications.map((items) => {
                        return (
                            <>
                                <div className="card card-styles ms-3">
                                    <section className="notif notif-notice">
                                        <div className='d-flex'>
                                            <i className='fa-solid fa-bell' />&nbsp;&nbsp;
                                            <h6 className="notif-title">{items.title}</h6>
                                        </div>
                                        <p className='mt-0 mb-2'>{items.body}</p>
                                        <p className='mt-0 mb-0'>{items.Idate}</p>
                                    </section>
                                </div>
                            </>
                        )
                    })
                }



            </div>
        </div>
    )
}

export default DailyNotifications