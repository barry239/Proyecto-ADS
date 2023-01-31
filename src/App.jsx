import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import EquationsList from "./components/equation/EquationsList";
import EquationForm from "./components/equation/EquationForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="/auth">
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                <Route path="/equations">
                    <Route index element={<EquationsList />} />
                    <Route path="create" element={<EquationForm />} />
                    <Route path="edit/:id" element={<EquationForm />} />
                </Route>
            </Routes>
        </Router>
    );
}
