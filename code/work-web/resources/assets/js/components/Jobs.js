import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Globals from '../globals.js';
import axios from 'axios';
const styles = {
  logo: {
      width: '75px',
      marginTop: '23px'
  },
    companyPanel: {
      boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 2px 3px rgba(0,0,0,.2)',
      width: '600px',
      marginTop: '-70px'
    },

    panelBox:{
        boxShadow: '0 0 0 1px rgba(0,0,0,.1), 0 2px 3px rgba(0,0,0,.2)',
        width: '600px'
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
    }
};
const initialState = {
    companiesList: [],
    jobApplication: {},
    status: 'In Asteptare',
    objective: '',
    education: '',
    experience: '',
    skills: ''
};
class Jobs extends Component {
    constructor(props){
        super(props);
        this.state = {
            companiesList: [],
            jobApplication: {},
            status: 'In Asteptare',
            objective: '',
            education: '',
            experience: '',
            skills: ''
        };

        this.requestCompanies = this.requestCompanies.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentWillMount(){
        this.requestCompanies();
    }

    requestCompanies(){
        axios({
            method: 'get',
            url: Globals.API + '/companies/get',
            headers: {
                'Authorization': 'Basic' + this.props.currentUser.access_token
            },
        })
            .then((response) => {
                if(response.data.success == true){
                    this.setState({companiesList: response.data.companies});
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    applyForJob(jobId){
        this.state.jobApplication = {
            status: this.state.status,
            objective: this.state.objective,
            education: this.state.education,
            experience: this.state.experience,
            skills: this.state.skills
        };
        axios({
            method: 'post',
            url: Globals.API + '/jobs-applications/add-job-application',
            data: {
                jobApplication: this.state.jobApplication,
                jobId: jobId
            },
            headers: {
                'Authorization': 'Basic' + this.props.currentUser.access_token
            },
        })
            .then((response) => {
                if(response.data.success == true){
                    //Curatam state-ul ca input-urile sa fie goale
                    this.setState(initialState);
                    console.log(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Cand se introduc date in input le adaugam in variabilele din state
    onChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        return (
            <div>
                {
                    this.state.companiesList.map(function (company, companyIndex)
                    {
                        return(
                            <div>
                                <div className='row'>
                                    <div className='panel center-block' style={styles.companyPanel}>
                                        <div className='panel-body'>
                                            <div className='col-sm-3'>
                                                <img src={company.logo} alt="logo" style={styles.logo}/>
                                            </div>
                                            <div className='col-sm-9'>
                                                <div className='row'>
                                                    <h3 style={styles.noMarginBottom}>
                                                        {company.name}
                                                    </h3>
                                                </div>
                                                <div className='row'>
                                                    <h5 style={styles.noMargin}>
                                                        <li>{company.num_followers} adepti </li>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='panel center-block' style={styles.panelBox}>
                                        <div className='panel-body'>
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h4>
                                                        <strong>
                                                            Despre noi
                                                        </strong>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6' style={styles.companyDescription}>
                                                    <p>
                                                        {company.description}
                                                    </p>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className='row' style={styles.noMarginLeft}>
                                                        <strong>
                                                            Site
                                                        </strong>
                                                    </div>
                                                    <div className='row'  style={styles.noMarginLeft}>
                                                        <strong>
                                                            <a href={company.website}>
                                                                {company.website}
                                                            </a>
                                                        </strong>
                                                    </div>
                                                    <div className='row'  style={styles.noMarginLeft}>
                                                        <strong>
                                                            Anul înființării
                                                        </strong>
                                                    </div>
                                                    <div className='row'  style={styles.noMarginLeft}>
                                                        {company.founded_year}
                                                    </div>
                                                    <div className='row'  style={styles.noMarginLeft}>
                                                        <strong>
                                                            Oras
                                                        </strong>
                                                    </div>
                                                    <div className='row'  style={styles.noMarginLeft}>
                                                        {company.locations[0].address.city}
                                                    </div>
                                                    <div className='row'  style={styles.noMarginLeft}>
                                                        <strong>
                                                            Nr. telefon
                                                        </strong>
                                                    </div>
                                                    <div className='row'  style={styles.noMarginLeft}>
                                                        {company.locations[0].contactInfo.phone1}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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
                                            {company.jobs.map(function (job, jobIndex) {
                                                return(
                                                    <div className='row' style={styles.jobRow}>
                                                        <div className='col-sm-2 pull-left'>
                                                            <img src={company.logo}  alt="logo" />
                                                        </div>
                                                        <div className='col-sm-8'>
                                                            <div className='row'>
                                                                    <h3 style={styles.noMargin}>
                                                                        <strong>
                                                                            <a href={job.url}>
                                                                                {job.position_title}
                                                                            </a>
                                                                        </strong>
                                                                    </h3>
                                                            </div>
                                                            <div className='row' style={styles.fadedText}>
                                                                <p>{job.location}</p>
                                                            </div>
                                                            <div className='row' style={styles.jobDescription}>
                                                                <p>
                                                                    {job.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-2 pull-right'>
                                                            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#jobApplicationModal">Aplică</button>
                                                        </div>

                                                        <div id="jobApplicationModal" className="modal fade" role="dialog">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                                        <h4 className="modal-title">{job.position_title}</h4>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className='row'>
                                                                            <div className='col-sm-3'>
                                                                                <strong>
                                                                                    Obiectiv
                                                                                </strong>
                                                                            </div>
                                                                            <div className='col-sm-9'>
                                                                                <textarea name="objective" value={this.state.objective} className="form-control form-group" onChange={this.onChange}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col-sm-3'>
                                                                                <strong>
                                                                                    Educatie
                                                                                </strong>
                                                                            </div>
                                                                            <div className='col-sm-9'>
                                                                                <textarea name="education" value={this.state.education} className="form-control form-group" onChange={this.onChange}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col-sm-3'>
                                                                                <strong>
                                                                                    Experienta
                                                                                </strong>
                                                                            </div>
                                                                            <div className='col-sm-9'>
                                                                                <textarea name="experience" value={this.state.experience} className="form-control form-group" onChange={this.onChange}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col-sm-3'>
                                                                                <strong>
                                                                                    Skills
                                                                                </strong>
                                                                            </div>
                                                                            <div className='col-sm-9'>
                                                                                <textarea name="skills" value={this.state.skills} className="form-control form-group" onChange={this.onChange}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" onClick={this.applyForJob.bind(this, job.id)} className="btn btn-default" data-dismiss="modal">Aplica</button>
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
                    }, this)
                 }
             }

            </div>
        );
    }
}

export default Jobs
