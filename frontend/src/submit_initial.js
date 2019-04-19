import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import './index.css'
import FormField from './util/form_field'
import SubmitButton from './util/submit_button'

class SubmitInitial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolOptions: [],
            course: '',
            school: '',
        };
    
        this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
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

    handleCourseNameChange(event) {
        this.setState({course: event.target.value});
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
        if (this.state['course'] === '' || this.state['school'] === '' || this.state['instructor'] === '' || this.state['year'] === '' || this.state['semester'] === '') {
            this.setState({warning: 'Must fill all entries.'});
            console.log("Not fully filled out.")
            return;
        } else {
            this.setState({warning: ''});
        }

        var passing_data;

        // format this fookin string man
        
        // submit info to api

        axios.get("/api/v1/courses/number/"
                    + this.state['course'] + "/school/" 
                    + this.state['school'] + "/year/" 
                    + this.state['year'] + "/semester/" 
                    + this.state['semester'])
        .then(function(response) {
            if (response.status === 200) {
                // passing_data set data to pass on
                // response.data.result
                
                
            }
        })
        .catch(function (error) {
            if (error.response.status === 404) {
                // create new entry
                axios.post("/api/v1/courses/oauth/token", {
                    number: self.state['course'], 
                    name: 'default', 
                    year: self.state['year'], 
                    semester: self.state['semester'], 
                    professor: self.state['instructor'], 
                    schoolCode: self.state['school']
                })
                .then(function(response) {
                    if (response.status === 200){
                        console.log("Nice");
                    }
                });

                // body contains the fields number, name, year, 
                // semester, professor, and schoolCode with the 
                // updated values and id with the course id to update.

                // set parsing data
            }

            console.log(error);
        });

        const queryString = this.getQueryString(this.state);

        this.setState({queryString: queryString})
        this.setState({searchWasMade: true})
        
        // send to next page
        



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
            <div>
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
                        label="Course Name"
                        tip={this.courseNameTip}
                        placeholder="CS2300"
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
                        tip={this.courseNameTip}
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