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
            return;
        } else {
            this.setState({warning: ''});
        }


        // submit info to api & see if in, if not, add
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


        // send to next page
        


        const queryString = this.getQueryString(this.state);

        this.setState({queryString: queryString})
        this.setState({searchWasMade: true})
        
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