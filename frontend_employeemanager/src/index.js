import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            {/*<Route path='/Home' element={<Home />} />*/}
        </Routes>
    </BrowserRouter>
);

reportWebVitals();