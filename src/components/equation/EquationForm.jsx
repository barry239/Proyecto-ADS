import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Navigation from "./Navigation";

export default function EquationForm() {
    const [ state, setState ] = useState({
        id: '',
        a: '',
        b: '',
        c: '',
        editing: false
    });

    const params = useParams();

    const navigate = useNavigate();

    const getEquation = (id) => {
        // Petición al servidor
        axios.post('http://localhost:8080/5CM52021630576IDPF/equations/GetEquation', {
            id
        })
            .then(({ data, status }) => {
                if (status === 200) {
                    const { equation } = data;
                    setState({ ...state, id, a: equation.a, b: equation.b, c: equation.c, editing: true });
                }
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

    const onFormSubmit = (e) => {
        e.preventDefault();

        // Establecer ruta
        const path = state.editing ? '/UpdateEquation' : '/CreateEquation';

        // Petición al servidor
        axios.post(`http://localhost:8080/5CM52021630576IDPF/equations/${path}`, {
            a: state.a,
            b: state.b,
            c: state.c,
            ...(state.editing && { id: state.id })
        })
            .then(({ data, status }) => {
                if (status === 200) navigate('/equations');
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

    useEffect(() => {
        const { id } = params;
        
        if (id) getEquation(id);
    }, []);

    return (
        <div>
            <Navigation />

            <main>
                <div className="container-xl px-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header justify-content-center">
                                    <h3 className="fw-light my-4">
                                        Create Equation
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Enter data:</p>
                                    <form onSubmit={onFormSubmit}>
                                        <div className="input-group">
                                            <input type="text" id="a" name="a" className="form-control" placeholder="a" onChange={handleInputChange} value={state.a} required />
                                            <span className="input-group-text">x<sup>2</sup> + </span>
                                            <input type="text" id="b" name="b" className="form-control" placeholder="b" onChange={handleInputChange} value={state.b} required />
                                            <span className="input-group-text">x + </span>
                                            <input type="text" id="c" name="c" className="form-control" placeholder="c" onChange={handleInputChange} value={state.c} required />
                                            <span className="input-group-text"> = 0</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end mt-4 mb-0">
                                            <button type="submit" className="btn btn-primary">Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
