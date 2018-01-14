import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Globals from '../globals.js';
import axios from 'axios';

const styles = {
    header: {
        width: '100%',
        backgroundImage: 'url(/images/app-background.jpg)',
        height: '200px',
        margin: '0'
    },
    panelBox:{
        boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 2px 3px rgba(0,0,0,.2)',
        width: '600px'
    },
    jobsApplicationPanel:{
        boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 2px 3px rgba(0,0,0,.2)',
        width: '550px'
    },
    noMarginBottom:{
        marginBottom: '0px'
    },

    noMarginTop: {
        marginTop: '0px'
    },

    noMargin: {
        marginTop: '0px',
        marginBottom: '0px'
    },

    about: {
        marginBottom: '10px'
    },

    companyDescription: {
        maxHeight: '170px',
        overflowX: 'hidden',
        overflowY: 'auto'
    },

    noMarginLeft: {
        marginLeft: '0'
    },

    fadedText: {
        color: 'rgba(0,0,0,.55'
    },

    jobRow: {
        borderBottom: '1px solid rgba(0,0,0,.15)',
        marginTop: '15px'
    },

    jobDescription: {
        maxHeight: '150px',
        overflowX: 'hidden',
        overflowY: 'auto',
        marginBottom: '10px'
    },

    jobsApplicationContainer: {
        padding: '15px'
    },

    companyLogo: {
        marginLeft: '4%'
    },

    jobsApplicationAttribute: {
        marginTop: '5px'
    }
};
class JobsApplications extends Component{
    constructor(props){
        super(props);
         this.state = {
             jobsApplications: []
         }
         ;
         this.requestJobsApplications = this.requestJobsApplications.bind(this);
    }

    componentDidMount(){
        this.requestJobsApplications();
    }

    requestJobsApplications(){
        axios({
            method: 'get',
            url: Globals.API + '/jobs-applications/get',
            headers: {
                'Authorization': 'Basic' + this.props.currentUser.access_token
            },
        })
            .then((response) => {
                if(response.data.success == true){
                    console.log(response.data);
                    this.setState({jobsApplications: response.data.jobsApplications})
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <div>
                <div className='row'>
                    <div className='panel center-block' style={styles.panelBox}>
                        <div className='panel-body'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <h4>
                                        <strong>
                                            Locuri de muncă
                                        </strong>
                                    </h4>
                                </div>
                            </div>
                {this.state.jobsApplications.map(function (jobApplication, index) {
                    return(
                        <div className='row' style={styles.jobRow}>
                            <div className='row'>
                                <div className='col-sm-2' style={styles.companyLogo}>
                                    <img src={jobApplication.job.company.logo}  alt="logo" />
                                </div>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <h3 style={styles.noMargin}>
                                            <strong>
                                                <a href={jobApplication.job.url}>
                                                    {jobApplication.job.position_title}
                                                </a>
                                            </strong>
                                        </h3>
                                    </div>
                                    <div className='row' style={styles.fadedText}>
                                        <p>{jobApplication.job.location}</p>
                                    </div>
                                </div>
                                <div className='col-sm-3 pull-right'>
                                    <button type="button" disabled={true} className="btn btn-success">{jobApplication.status}</button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='panel center-block' style={styles.jobsApplicationPanel}>
                                    <div style={styles.jobsApplicationContainer}>
                                        <div className='row'>
                                            <div className='col-sm-3' style={styles.jobsApplicationAttribute}>
                                                <strong>
                                                    Obiectiv
                                                </strong>
                                            </div>
                                            <div className='col-sm-9'>
                                                <textarea name="objective" value={jobApplication.objective} className="form-control form-group" disabled={true}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-3' style={styles.jobsApplicationAttribute}>
                                                <strong>
                                                    Educatie
                                                </strong>
                                            </div>
                                            <div className='col-sm-9'>
                                                <textarea name="education" value={jobApplication.education} className="form-control form-group" disabled={true}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-3' style={styles.jobsApplicationAttribute}>
                                                <strong>
                                                    Experienta
                                                </strong>
                                            </div>
                                            <div className='col-sm-9'>
                                                <textarea name="experience" value={jobApplication.experience} className="form-control form-group" disabled={true}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-3' style={styles.jobsApplicationAttribute}>
                                                <strong>
                                                    Skills
                                                </strong>
                                            </div>
                                            <div className='col-sm-9'>
                                                <textarea name="skills" value={jobApplication.skills} className="form-control form-group" disabled={true}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }, this)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default JobsApplications;
