import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { format } from "timeago.js";

export default function EquationCard({ equation, deleteEquation, changeEquation }) {
    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-body text-center">
                    <p className="card-text">
                        {equation.a} <var>x</var><sup>2</sup> {equation.b < 0 ? '-' : '+'} {Math.abs(equation.b)} <var>x</var> {equation.c < 0 ? '-' : '+'} {Math.abs(equation.c)} = 0
                    </p>
                    <div className="row">
                        <div className="col d-grid mb-2 mb-sm-0">
                            <button className="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#graph" onClick={() => changeEquation(equation)}>
                                <FontAwesomeIcon icon={icon({name:'chart-line', style: 'solid'})} size="sm" fixedWidth />
                            </button>
                        </div>
                        <div className="col d-grid mb-2 mb-sm-0">
                            <Link to={`/equations/edit/${equation.id}`} className="btn btn-warning">
                                <FontAwesomeIcon icon={icon({name:'pen-to-square', style: 'solid'})} size="sm" fixedWidth />
                            </Link>
                        </div>
                        <div className="col d-grid mb-2 mb-sm-0">
                            <button className="btn btn-danger" type="button" onClick={() => deleteEquation(equation.id)}>
                                <FontAwesomeIcon icon={icon({name:'trash', style: 'solid'})} size="sm" fixedWidth />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Created {format(equation.created)}</small>
                </div>
            </div>
        </div>
    );
}
