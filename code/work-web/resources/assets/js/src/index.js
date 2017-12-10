import React from "react";
import ReactDOM from "react-dom";
import Login from "../components/Login.js";
import { BrowserRouter, Route, Router, HashRouter } from 'react-router-dom';
import Dashboard from "../components/Dashboard";
import Main from "../components/Main";

ReactDOM.render(
    <Main/>,
    document.getElementById("root")
);

// (<BrowserRouter>
//     <div>
//         <Route path="/" component={Login} />
//         <Route path="/dashboard" component={Main}/>
//     </div>
// </BrowserRouter>)
