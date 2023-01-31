import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="container py-4">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-6 fw-bold">Reconocimiento de objetos usando TensorFlow.js con React, ECMAScript 6, Babel Y Webpack</h1>
                    <p className="col-md-8 fs-5">
                        <span className="fw-bold">Nombre:</span> Quintero Maldonado Fabián
                    </p>
                    <p className="col-md-8 fs-5">
                        <span className="fw-bold">Boleta:</span> 2021630576
                    </p>
                    <Link to="/auth/signin" className="btn btn-primary btn-lg">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
