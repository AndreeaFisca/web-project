import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    NavLink,
    HashRouter,
    withRouter
} from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from "./Dashboard";
import Main from "./Main";
import Globals from "../globals.js";

const styles = {
    loginInstructions: {
        marginTop: "10px"
    },
    loginButton: {
        marginTop: "20px"
    },
    panel: {
        width: "420px",
        marginTop: "30px"
    },
    logo: {
        maxWidth: "250px"
    }
};
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        Globals.currentUser={
            username: this.state.username
        };
        if(this.state.username.length !==0 && this.state.password.length !==0){
            this.setState({redirect: true});
        }
    }
    //Cand se introduc date in input le adaugam in variabilele din state
    onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    render() {
        const { username, password } = this.state;
        if (this.state.redirect) {
            console.log(Globals.currentUser);
            return <Redirect push to="/dashboard" />;
        }
        return (
            <div className="panel center-block" style={styles.panel}>
                <div className="text-center">
                    <img src="../../images/logo.png" alt="logo" style={styles.logo}/>
                </div>
                <div className="panel-body">
                    <p className="text-center" style={styles.loginInstructions}>
                        Login to continue
                    </p>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" name="username" value={username} className="form-control form-group" onChange={this.onChange}/>
                        <input type="text" name="password" value={password} className="form-control form-group" onChange={this.onChange}/>
                        <button type="submit" className="btn btn-block btn-primary" style={styles.loginButton}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
