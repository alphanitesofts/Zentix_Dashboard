import React, { useState } from 'react'
import { Modal } from 'pretty-modal'
import baseUrl from '../Sourcefiles/BaseUrl';
import { toast } from 'react-toastify';

const ChangePassword = ({ userID, closeModal, showModal }) => {

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fieldStatus, setFieldStatus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const summitData = () => {
        setFieldStatus(true)
        if (!password && !newPassword && !confirmPassword) {
            toast.warn('Please fill all fields')
        }
        else {

            var formdata = new FormData();
            formdata.append("old_password", password);
            formdata.append("password", newPassword);
            formdata.append("confirm_password", confirmPassword);
            formdata.append("id", userID.id);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(`${baseUrl}changepassword`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    toast.info(result.message)
                })
                .catch(error => {
                    console.log('error', error)
                    toast.info('Error while updating password')
                });

        }
    }

    const showConfirmPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div>
                <Modal
                    onClose={() => { closeModal(false) }} open={showModal}
                >
                    <div className="d-flex">
                        <h5>Change Password</h5>
                        <button className="btn btn-sm btn-danger ms-auto"
                            onClick={() => {
                                closeModal(false);
                            }}>X
                        </button>
                    </div>
                    <hr className="w-100" />
                    <div className="row mb-3">
                        <div className="col-lg-3">
                            <label htmlFor="exampleInputEmail1" className="form-label mt-2">
                                Password
                            </label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                style={{
                                    borderColor:
                                        password === "" && fieldStatus === true ? "red" : "#ced4da",
                                }}
                            />
                            <span className="icon me-4">
                                {showPassword === false ? (
                                    <i
                                        className="fa-solid fa-eye "
                                        onClick={showConfirmPassword}
                                    />
                                ) : (
                                    <i
                                        className="fa-solid fa-eye-slash"
                                        onClick={showConfirmPassword}
                                    />
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                New Password
                            </label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                style={{
                                    borderColor:
                                        newPassword === "" && fieldStatus === true ? "red" : "#ced4da",
                                }}
                            />
                            
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Confirm Password
                            </label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                style={{
                                    borderColor:
                                        confirmPassword === "" && fieldStatus === true ? "red" : "#ced4da",
                                }}
                            />
                           
                        </div>
                    </div>

                    <button className="btn btn-success btn-sm float-end" onClick={summitData}>Update Password</button>
                </Modal>
            </div>
        </div>
    )
}

export default ChangePassword