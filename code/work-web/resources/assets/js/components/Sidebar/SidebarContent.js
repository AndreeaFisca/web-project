import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTitlePanel from './MaterialTitlePanel';
import PropTypes from 'prop-types';
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Jobs from "../Jobs";
import Switch from "react-router-dom/es/Switch";
import Nav from "react-bootstrap/es/Nav";
import JobsApplications from "../JobsApplications";


const styles = {
    sidebar: {
        width: 256,
        height: '100%',
    },
    sidebarLink: {
        display: 'block',
        padding: '16px 0px',
        color: '#757575',
        textDecoration: 'none',
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
    },
    content: {
        padding: '16px',
        height: '100%',
        backgroundColor: 'white',
    },
    profileImg: {
        marginBottom: '30px'
    },
    logo: {
        maxWidth: '200px',
        marginLeft: '-10px',
        marginTop: '-35px'
    },
    backgroundImage: {
        backgroundImage: 'url(/images/app-background.jpg)',
        height: '50px'
    },
    welcomeMessage: {
        marginTop: '40px'
    },
    logoContainer: {
        height: '80px'
    },
    logoutSymbol: {
        marginRight: '10px',
        color: '#fff'
    },
    logoutText: {
        color: '#fff'
    },
    logoutButton: {
        backgroundColor: '#d9534f',
        borderColor: '#d43f3a'
    },
    logoutRow: {
        marginTop: '350px'
    }
};

class SidebarContent extends Component{
    constructor(props){
        super(props);

        this.state = {
        }

    }

    disconnectUser(){
        this.props.updateUserData(null)
    }

    render(){
        return (
            <MaterialTitlePanel title="Meniu" style={styles.sidebar}>
                <div style={styles.content}>
                    <div className="text-center" style={styles.logoContainer}>
                        <img src="/images/logo.png" alt="logo" style={styles.logo}/>
                    </div>
                    <div className="row" style={styles.backgroundImage}>
                        <img src={this.props.currentUser.profile_picture} className="img-circle center-block" style={styles.profileImg}/>
                    </div>
                    <div className="row" style={styles.welcomeMessage}>
                        <b className="col-md-10 text-center col-md-offset-1">
                            Bun venit, {this.props.currentUser.first_name} {this.props.currentUser.last_name}!
                        </b>
                    </div>
                    <div style={styles.divider} />

                            <NavLink tag={Jobs} to="/jobs" style={styles.sidebarLink}>Joburi</NavLink>
                            <NavLink tag={JobsApplications} to="/jobs-applications" style={styles.sidebarLink}>Aplicari la Joburi</NavLink>

                    <div className='row' style={styles.logoutRow}>
                        <button className='btn center-block' style={styles.logoutButton}>
                            <em className="fa fa-lock text-muted" style={styles.logoutSymbol}></em>
                            <span style={styles.logoutText} onClick={this.disconnectUser.bind(this)}>Deconectare</span>
                        </button>
                    </div>
                </div>

            </MaterialTitlePanel>
        );
    }
}

export default SidebarContent;
