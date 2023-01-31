import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Navigation() {
    const navigate = useNavigate();

    const logout = () => {
        // Petición al servidor
        axios.post('http://localhost:8080/5CM52021630576IDPF/auth/Logout', {})
            .finally(() => navigate('/'));
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={'/equations'} className="navbar-brand">
                    <FontAwesomeIcon icon={icon({name:'house', style: 'solid'})} fixedWidth />
                    <span>Home</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button type="button" className="btn btn-secondary" onClick={() => logout()}>
                                <FontAwesomeIcon icon={icon({name:'right-from-bracket', style:'solid'})} fixedWidth />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
