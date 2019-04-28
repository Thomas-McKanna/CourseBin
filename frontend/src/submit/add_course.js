import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import './style.css'
import FormField from '../util/form_field'
import SubmitButton from '../util/submit_button'
import Warning from '../util/warning'
import { 
    BrowserRouter, 
    Route, 
    Switch,
    Link,
    Redirect,
  } from "react-router-dom";

class SubmitInitial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolOptions: [],
            coursenumber: '',
            school: '',
            year: '2019',
            semester: 'Spring',
            coursename: '',
            instructor: '',
        };

        this.semesterOptions = ['Spring', 'Fall', 'Summer']
        this.yearOptions = []

        var i;
        for (i = 2019; i >= 2000; i--) {
            this.yearOptions.push(String(i))
        }
    
        this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
        this.handleCourseNumberChange = this.handleCourseNumberChange.bind(this);
        this.handleSchoolNameChange = this.handleSchoolNameChange.bind(this);
        this.handleInstructorNameChange = this.handleInstructorNameChange.bind(this);
        this.handleYearNameChange = this.handleYearNameChange.bind(this);
        this.handleSemesterNameChange = this.handleSemesterNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getSchoolOptions = this.getSchoolOptions.bind(this);
        this.getSemesterOptions = this.getSemesterOptions.bind(this);
        this.getYearOptions = this.getYearOptions.bind(this);
    }

    componentDidMount() {
        var self = this; // bind "this" so that callbacks can use it
        axios.get('/api/v1/schools/names')
        .then(function(response) {
            if (response.status === 200) {
                self.setState({schoolOptions: response.data.result});
                self.setState({school: response.data.result[0]['school_code']})
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleSchoolNameChange(event) {
        this.setState({school: event.target.value});
        return;
    }

    handleCourseNumberChange(event) {
        this.setState({coursenumber: event.target.value});
        return;
    }

    handleCourseNameChange(event) {
        this.setState({coursename: event.target.value});
        return;
    }

    handleInstructorNameChange(event) {
        this.setState({instructor: event.target.value});
        return;
    }

    handleYearNameChange(event) {
        this.setState({year: event.target.value});
        return;
    }

    handleSemesterNameChange(event) {
        this.setState({semester: event.target.value});
        return;
    }
    
    handleSubmit(event) {
        var self = this; // bind "this" so that callbacks can use it

        event.preventDefault();
        if (this.state['coursenumber'] === '' || this.state['school'] === '') {
            this.setState({warning: 'Must fill all entries.'});
            console.log('Some required fields not filled in.')
            return;
        } else {
            this.setState({warning: ''});
        }

        axios.get("/api/v1/courses/number/"
                    + this.state['coursenumber'] + "/school/" 
                    + this.state['school'] + "/year/" 
                    + this.state['year'] + "/semester/" 
                    + this.state['semester'])
        .catch(function (error) {
            if (error.response.status === 404) {

                // before submitting to db ensure coursename exists
                if (self.state['coursename'] === '') {
                    self.setState({warning: 'Some required fields not filled in.'});
                    return; 
                }

                const cookies = new Cookies();

                console.log(cookies.get('auth'));
                axios.post("/api/v1/courses/", {
                    number: self.state['coursenumber'], 
                    name: self.state['coursename'], 
                    year: self.state['year'], 
                    semester: self.state['semester'], 
                    professor: self.state['instructor'], 
                    schoolCode: self.state['school']
                },
                {headers: {
                    "Authorization": `bearer ${cookies.get('auth')}`
                }})
                .then(function(response) {
                    if (response.status === 200){
                        console.log("Nice");
                    }
                });
            }

            console.log(error);
        });

        if(this.state['coursename'] === '') {
            self.setState({warning: 'Must fill course name for non existant course.'});
            console.log("Must fill course name for non existant course.")
            return;
        }
        
        const queryString = this.getQueryString(this.state);

        this.setState({queryString: queryString});
        this.setState({searchWasMade: true});

        this.props.history.push('/submit', {
             course_school: this.state['school'],
             course_number: this.state['coursenumber'],
             course_name: this.state['coursename'],
             course_year: this.state['year'],
             course_semester: this.state['semester'],
             course_instructor: this.state['instructor']
            });
        
        return;
    }

    getQueryString(st) {
        var params = []
        params.push('course=' + st['course'])
        params.push('school=' + st['school'])
        params.push('instructor=' + st['instructor'])
        params.push('year=' + st['year'])
        params.push('semester=' + st['semester'])
        
        var qString = "";
        var i;
        const len = params.length;
        for (i = 0; i < len; i++) {
            if (params[i] !== "") {
                qString += params[i];
                if (i !== len - 1) {
                    qString += "&"
                }
            }
        }
        return '?' + qString
    }

    render() {
        return (
            <div className="course_lookup" >
                <h2>Course Lookup</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormField
                        select
                        getOptions={this.getSchoolOptions}
                        label="School Name"
                        placeholder="CS2300"
                        css_class="input"
                        handleFunc={this.handleSchoolNameChange}/>
                    <FormField 
                        input
                        label="Course Number"
                        placeholder="CS2300"
                        css_class="input"
                        handleFunc={this.handleCourseNumberChange}/>
                    <FormField 
                        input
                        label="Course Name"
                        placeholder=""
                        css_class="input"
                        aside="optional"
                        handleFunc={this.handleCourseNameChange}/>
                    <FormField 
                        select
                        getOptions={this.getYearOptions}
                        label="Year"
                        placeholder="2020"
                        css_class="input"
                        handleFunc={this.handleYearNameChange}/>
                    <FormField
                        select
                        getOptions={this.getSemesterOptions}
                        label="Semester"
                        placeholder="Spring or Fall"
                        css_class="input"
                        handleFunc={this.handleSemesterNameChange}/>
                    <FormField
                        input
                        label="Instructor Name"
                        placeholder=""
                        css_class="input"
                        aside="optional"
                        handleFunc={this.handleInstructorNameChange}/>
                    {this.state['warning'] !== '' &&
                        <Warning 
                            msg={this.state['warning']}
                        />
                    }
                    <SubmitButton
                        label="Submit"
                        handleFunc={this.handleSubmit}/>                    
                </form>
            </div>
        );
    }

    getSchoolOptions() {
        console.log(this.state.schoolOptions)
        return this.state.schoolOptions.map((school) =>
            <option key={school.school_code} value={school.school_code}>
                {school.school_name}
            </option>
        );
    }

    getSemesterOptions() {
        return this.semesterOptions.map((semester) =>
            <option key={semester} value={semester}>
                {semester}
            </option>
        );
    }

    getYearOptions() {
        return this.yearOptions.map((year) =>
            <option key={year} value={year}>
                {year}
            </option>
        );
    }
}

export default SubmitInitial;