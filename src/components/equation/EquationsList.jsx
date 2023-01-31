import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Swal from "sweetalert2";

import Navigation from "./Navigation";
import EquationCard from "./EquationCard";
import EquationGraph from "./EquationGraph";

export default function EquationsList() {
    const [ state, setState ] = useState({
        equations: [],
        equation: null
    });

    const getEquations = () => {
        // Petición al servidor
        axios.post('http://localhost:8080/5CM52021630576IDPF/equations/GetEquations', {})
            .then(({ data, status }) => {
                if (status === 200) setState({ ...state, equations: data.equations });
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

    const deleteEquation = (id) => {
        // Pedir confirmación de eliminación
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    // Petición al servidor
                    axios.post('http://localhost:8080/5CM52021630576IDPF/equations/DeleteEquation', {
                        id
                    })
                        .then(({ data, status }) => {
                            if (status === 200) {
                                Swal.fire({
                                    icon: "success",
                                    title: data.msg,
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                });
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
                        })
                        .finally(() => getEquations());
                }
            });
    }

    const changeEquation = (equation) => {
        setState({ ...state, equation });
    }

    useEffect(() => {
        getEquations();
    }, []);

    return (
        <div>
            <Navigation />

            <div className="container py-4">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Your equations</h1>
                    <Link to={'/equations/create'} className="d-none d-sm-inline-block btn btn-success">
                        <FontAwesomeIcon icon={icon({name:'plus', style: 'solid'})} size="sm" fixedWidth />
                        <span>Create equation</span>
                    </Link>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        state.equations.map(equation => (
                            <EquationCard equation={equation} deleteEquation={deleteEquation} changeEquation={changeEquation} key={equation.id} />
                        ))
                    }
                </div>
            </div>

            <EquationGraph equation={state.equation} />
        </div>
    );
}
