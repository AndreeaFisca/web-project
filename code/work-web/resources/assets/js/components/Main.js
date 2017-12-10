import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from "./Sidebar/MaterialTitlePanel";
import SidebarContent from "./Sidebar/SidebarContent";
import Login from "./Login";
import PropTypes from 'prop-types';
import withRouter from "react-router-dom/es/withRouter";
import Globals from "../globals.js";

const styles = {
    contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        padding: 8,
    },
    content: {
        padding: '16px',
    },
};
const SomeComponent = withRouter(props => <Main {...props}/>);
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

    render() {
        const sidebar = <SidebarContent />;

        const contentHeader = (
            <span>
        {!this.state.docked &&
        <a onClick={this.menuButtonClick} href="#" style={styles.contentHeaderMenuLink}>=</a>}
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
        if(Object.keys(Globals.currentUser).length === 0) {
            console.log(Globals);
            return (
                <HashRouter>
                    <div style={styles.content}>
                        <div className="content">
                            <Route path="/login" component={Login}/>
                            <Route path="/" component={Login}/>
                        </div>
                    </div>
                </HashRouter>
            )
        }
        return (
            <Sidebar {...sidebarProps}>
                <MaterialTitlePanel title={contentHeader}>
                    <HashRouter>
                        <div style={styles.content}>
                            <div className="content">
                                <Route path="/dashboard" component={Dashboard}/>
                                <Route path="/jobs" component={JobsManagement}/>
                            </div>
                        </div>
                    </HashRouter>
                </MaterialTitlePanel>
            </Sidebar>
        );
    }
}

export default Main
