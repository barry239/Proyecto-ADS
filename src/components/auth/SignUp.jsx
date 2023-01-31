import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
    const [ state, setState ] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const onFormSubmit = (e) => {
        e.preventDefault();

        // Petición al servidor
        axios.post('http://localhost:8080/5CM52021630576IDPF/auth/SignUp', {
            username: state.username,
            password: state.password,
            confirmPassword: state.confirmPassword
        })
            .then(({ data, status }) => {
                if (status === 200) navigate('/auth/signin');
            })
            .catch(({ response: { data } }) => {
                Swal.fire({
                    icon: "error",
                    title: data.error,
                    position: "top-end",
                    toast: true,
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                });
            });
    }

    const handleInputChange = (e) => {
        const { target: { name, value }} = e;
        setState({ ...state, [name]: value });
    }

    return (
        <main>
            <div className="container-xl px-4">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header justify-content-center">
                                <h3 className="fw-light my-4">
                                    Create Account
                                </h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={onFormSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="small mb-1">Username</label>
                                        <input type="text" id="username" name="username" className="form-control" placeholder="Enter username" onChange={handleInputChange} required />
                                    </div>
                                    <div className="row gx-3">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="password" className="small mb-1">Password</label>
                                                <input type="password" id="password" name="password" className="form-control" placeholder="Enter password" onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="confirmPassword" className="small mb-1">Confirm Password</label>
                                                <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm password" onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end mt-4 mb-0">
                                        <button className="btn btn-primary">Sign up</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center">
                                <div className="small">
                                    <Link to={'/auth/signin'}>Have an account? Go to login!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
