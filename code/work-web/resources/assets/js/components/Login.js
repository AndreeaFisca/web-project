import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    NavLink,
    withRouter
} from "react-router-dom";
import { Redirect } from 'react-router';
import Jobs from './Jobs';
import Main from './Main';
import Globals from '../globals.js';
import axios from 'axios';

const styles = {
    loginInstructions: {
        marginTop: "10px"
    },
    loginButton: {
        marginTop: "20px"
    },
    panel: {
        width: "420px",
        marginTop: "200px",
        marginBottom: "30px"
    },
    logo: {
        maxWidth: "250px"
    },
    mainDiv: {
        width: '100%',
        height: '100%',
        background: '#2c3e50',
        display: 'inline-block'
    }
};
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            linkedInUrl: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);

        if(query.get('code') && query.get('state')){
            const code = query.get('code');
            axios.post(Globals.API + '/user/save', {
                code: code,
            })
                .then((response) => {
                    if(response.data.success == true){
                        this.props.updateUserData(response.data.user);
                        this.props.history.push("/jobs");
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }
    componentDidMount(){
        axios.get(Globals.API + '/auth/login')
            .then((response) => {
                this.setState({linkedInUrl: response.data.url});
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    onSubmit(e){
        e.preventDefault();
        this.props.updateUserData(response.data.user);
        Globals.currentUser={
            username: this.state.username,
            password: this.state.password
        };
        axios.post('http://work-web.test/api/auth/login', {
            user: Globals.currentUser
        })
            .then(function (response) {
                //this.setState({redirect: true});
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    //Cand se introduc date in input le adaugam in variabilele din state
    onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    render() {
        const { username, password, linkedInUrl } = this.state;

        return (
            <div style={styles.mainDiv}>
                <div className="panel center-block" style={styles.panel}>
                    <div className="text-center">
                        <img src="/images/logo.png" alt="logo" style={styles.logo}/>
                    </div>
                    <div className="panel-body">
                        <a href={linkedInUrl} className="btn btn-block btn-social btn-linkedin">
                            <span className="fa fa-linkedin"></span>
                            Sign in with LinkedIn
                        </a>
                        {/*<p className="text-center" style={styles.loginInstructions}>*/}
                            {/*Login to continue*/}
                        {/*</p>*/}
                        {/*<form onSubmit={this.onSubmit}>*/}
                            {/*<input type="text" name="username" value={username} className="form-control form-group" onChange={this.onChange}/>*/}
                            {/*<input type="text" name="password" value={password} className="form-control form-group" onChange={this.onChange}/>*/}
                            {/*<button type="submit" className="btn btn-block btn-primary" style={styles.loginButton}>Login</button>*/}
                        {/*</form>*/}
                    </div>
                    <div className="panel-footer">

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
