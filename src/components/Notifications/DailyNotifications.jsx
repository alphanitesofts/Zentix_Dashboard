import React, { useState } from 'react'
import baseUrl from '../Sourcefiles/BaseUrl';
import { useEffect } from 'react';

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

        var formdata = new FormData();
        formdata.append("receiver_id", id);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${baseUrl}fetch_notification_by_rid`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "200") {
                    setNotifications(result.Notification)
                    setLoader(false)
                }
                else if (result.status === "401") {
                    setLoader(false)
                }
                console.log(result)
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    return (
        <div className='scroll-view-two scrollbar-secondary-two'>
            <div className='content-wrapper '>
                <h2 className="p-3" style={{ color: "#5e5873" }}><b>Notifications</b></h2>

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
                        </>
                        :
                        notifications.length >= 1 ?
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
                            :
                            <>
                                <div className="card card-styles ms-3">
                                    <section className="notif notif-notice">
                                        <div className='d-flex'>
                                            <i className='fa-solid fa-bell' />&nbsp;&nbsp;
                                            <h6 className="notif-title">No Notifications yet!</h6>
                                        </div>
                                        <p className='mt-0 mb-2'>You will start recieving notifications here</p>
                                    </section>
                                </div>
                            </>
                }

            </div>
        </div>
    )
}

export default DailyNotifications