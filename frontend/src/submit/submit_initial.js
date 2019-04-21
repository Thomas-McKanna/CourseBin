import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import './style.css'
import FormField from '../util/form_field'
import SubmitButton from '../util/submit_button'

class SubmitInitial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolOptions: [],
            coursenumber: '',
            school: '',
            year: '',
            semester: '',
            coursename: '',
            instructor: '',
        };
    
        this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
        this.handleCourseNumberChange = this.handleCourseNumberChange.bind(this);
        this.handleSchoolNameChange = this.handleSchoolNameChange.bind(this);
        this.handleInstructorNameChange = this.handleInstructorNameChange.bind(this);
        this.handleYearNameChange = this.handleYearNameChange.bind(this);
        this.handleSemesterNameChange = this.handleSemesterNameChange.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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
        if (this.state['coursenumber'] === '' || this.state['school'] === '' || 
            this.state['instructor'] === '' || this.state['year'] === '' || 
            this.state['semester'] === '') {
            this.setState({warning: 'Must fill all entries.'});
            console.log("Not fully filled out.")
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
                    self.setState({warning: 'Must fill course name for non existant course.'});
                    console.log("Must fill course name for non existant course.")
                    return;  // how to completely break out
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
            return;  // how to completely break out
        }
        
        const queryString = this.getQueryString(this.state);

        this.setState({queryString: queryString});
        this.setState({searchWasMade: true});
        
        // send passing data to next page
        this.props.history.push('/submit')

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
                        options={this.state.schoolOptions}
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
                        placeholder="input if course doesnt exist"
                        css_class="input"
                        handleFunc={this.handleCourseNameChange}/>
                    <FormField
                        input
                        label="Instructor Name"
                        placeholder="Dr. "
                        css_class="input"
                        handleFunc={this.handleInstructorNameChange}/>
                    <FormField 
                        input
                        label="Year"
                        placeholder="2020"
                        css_class="input"
                        handleFunc={this.handleYearNameChange}/>
                    <FormField
                        input
                        label="Semester"
                        placeholder="Spring or Fall"
                        css_class="input"
                        handleFunc={this.handleSemesterNameChange}/>
                    <SubmitButton
                        label="Submit"
                        handleFunc={this.handleSubmit}/>                    
                </form>
            </div>
        );
    }
}

export default SubmitInitial;