import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    NavLink,
    BrowserRouter,
    Switch,
    Redirect
} from "react-router-dom";
import Jobs from "./Jobs";
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from "./Sidebar/MaterialTitlePanel";
import SidebarContent from "./Sidebar/SidebarContent";
import Login from "./Login";
import PropTypes from 'prop-types';
import withRouter from "react-router-dom/es/withRouter";
import Globals from "../globals.js";
import axios from "axios/index";
import JobsApplications from "./JobsApplications";

const styles = {
    contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        padding: 8,
        cursor: 'pointer'
    },
    header: {
        width: '100%',
        backgroundImage: 'url(/images/app-background.jpg)',
        height: '200px',
        margin: '0'
    }
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            pullRight: false,
            touchHandleWidth: 20,
            dragToggleDistance: 30,
            currentUser: {}
        };

        this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
        this.renderPropNumber = this.renderPropNumber.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
        this.menuButtonClick = this.menuButtonClick.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
    }



    onSetOpen(open) {
        this.setState({open: open});
    }

    menuButtonClick(ev) {
        ev.preventDefault();
        this.onSetOpen(!this.state.open);
    }

    renderPropCheckbox(prop) {
        const toggleMethod = (ev) => {
            const newState = {};
            newState[prop] = ev.target.checked;
            this.setState(newState);
        };

        return (
            <p key={prop}>
                <input type="checkbox" onChange={toggleMethod} checked={this.state[prop]} id={prop} />
                <label htmlFor={prop}> {prop}</label>
            </p>);
    }

    renderPropNumber(prop) {
        const setMethod = (ev) => {
            const newState = {};
            newState[prop] = parseInt(ev.target.value, 10);
            this.setState(newState);
        };

        return (
            <p key={prop}>
                {prop} <input type="number" onChange={setMethod} value={this.state[prop]} />
            </p>);
    }

    updateUserData(user){
        if(user !== null && typeof user === 'object'){
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }else{
            sessionStorage.setItem('currentUser', JSON.stringify(null));
            this.render();
        }
        this.setState({
            currentUser: user
        })
    }

    render() {
        const sidebar = <SidebarContent updateUserData={this.updateUserData} currentUser={this.state.currentUser}/>;

        const contentHeader = (
            <span>
        {!this.state.docked &&
        <a onClick={this.menuButtonClick} style={styles.contentHeaderMenuLink}>=</a>}
                <span> Work Web</span>
      </span>);

        const sidebarProps = {
            sidebar: sidebar,
            docked: this.state.docked,
            sidebarClassName: 'custom-sidebar-class',
            open: this.state.open,
            touch: this.state.touch,
            shadow: this.state.shadow,
            pullRight: this.state.pullRight,
            touchHandleWidth: this.state.touchHandleWidth,
            dragToggleDistance: this.state.dragToggleDistance,
            transitions: this.state.transitions,
            onSetOpen: this.onSetOpen,
        };

        if(sessionStorage.getItem('currentUser') == null) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/login/:code/:state" render={() => <Login updateUserData={this.updateUserData} currentUser={this.state.currentUser} />}/>
                        <Route path="/" render={() => <Login updateUserData={this.updateUserData} currentUser={this.state.currentUser} />}/>
                        {/*Daca o ruta gresita este accesata userul este redirectionat la / */}
                        <Route path="*" render={() => <Login updateUserData={this.updateUserData} currentUser={this.state.currentUser} />}/> />
                    </Switch>
                </BrowserRouter>
            )
        }

        this.state.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        return (
            <BrowserRouter>
                <Sidebar {...sidebarProps}>
                    <MaterialTitlePanel title={contentHeader}>
                        <div className='row' style={styles.header}></div>
                        <Switch>
                            <Route path="/jobs" render={() => <Jobs updateUserData={this.updateUserData} currentUser={this.state.currentUser} />}/>
                            {/*Daca o ruta gresita este accesata userul este redirectionat la /jobs*/}
                            <Route path='/jobs-applications' render={() => <JobsApplications updateUserData={this.updateUserData} currentUser={this.state.currentUser}/>}/>
                            <Route path="*" render={() => <Jobs updateUserData={this.updateUserData} currentUser={this.state.currentUser} />}/>
                        </Switch>
                    </MaterialTitlePanel>
                </Sidebar>
            </BrowserRouter>
        );
    }
}

export default Main
