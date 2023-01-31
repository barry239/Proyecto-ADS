import React, { useRef, useState } from "react";
import { parse } from "mathjs";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function EquationGraph({ equation }) {
    const [state, setState] = useState({
        min: '-2',
        max: '2'
    });

    const chartRef = useRef();

    const getRoots = () => {
        const { a, b, c } = equation;

        // Calcular raíces
        const x1 = parse('(-b + sqrt(b^2 - 4 * a * c))/(2 * a)').evaluate({ a, b, c }).toString();
        const x2 = parse('(-b - sqrt(b^2 - 4 * a * c))/(2 * a)').evaluate({ a, b, c }).toString();
        
        return [ x1, x2 ];
    }

    const getGraph = () => {
        const { a, b, c } = equation;

        const min = parseInt(state.min);
        const max = parseInt(state.max);

        const data = {
            labels: Array.from({length: max - min + 1}, (_, i) => i + min),
            datasets: [
                {
                    label: `f(x) = ${a}x² ${b < 0 ? '-' : '+'} ${Math.abs(b)} ${c < 0 ? '-' : '+'} ${Math.abs(c)}`,
                    function: (x) => (a * (x ** 2)) + (b * x) + c ,
                    data: [],
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: "rgba(78, 115, 223, 0.05)",
                    borderColor: "rgba(78, 115, 223, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointBorderColor: "rgba(78, 115, 223, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2
                }
            ]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false
        };

        const plugins = [
            {
                beforeInit: (chart) => {
                    const { config: { data } } = chart;

                    for (let i = 0; i < data.datasets.length; i++) {
                        for (let j = 0; j < data.labels.length; j++) {
                            const { function: fct } = data.datasets[i];
                            const x = data.labels[j];
                            const y = fct(x);
                            data.datasets[i].data.push(y);
                        }
                    }
                }
            }
        ];

        return <Line ref={chartRef} data={data} options={options} plugins={plugins} redraw={true} />;
    }

    const handleInputChange = (e) => {
        const { target: { name, value }} = e;
        setState({ ...state, [name]: value });
    }

    return (
        <div className="modal fade" id="graph" tabIndex="-1" aria-labelledby="graphLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="graphLabel">Graph</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <p>Resultado:</p>
                            <div className="row gx-3">
                                <div className="col-sm-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><var>x<sub>1</sub></var> = </span>
                                        <input type="text" id="x1" className="form-control" value={equation ? getRoots()[0] : ''} disabled />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><var>x<sub>2</sub></var> = </span>
                                        <input type="text" id="x2" className="form-control" value={equation ? getRoots()[1] : '' } disabled />
                                    </div>
                                </div>
                            </div>
                            {
                                equation && (
                                    <div>
                                        <hr />
                                        <div className="row gx-3">
                                            <div className="col-sm-6">
                                                <div className="mb-3">
                                                    <label htmlFor="min" className="small mb-1">Min:</label>
                                                    <input type="number" id="min" name="min" className="form-control" placeholder="Min value" onChange={handleInputChange} value={state.min} required />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="mb-3">
                                                    <label htmlFor="max" className="small mb-1">Max:</label>
                                                    <input type="number" id="max" name="max" className="form-control" placeholder="Max value" onChange={handleInputChange} value={state.max} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-10">
                                                {
                                                    getGraph()
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
