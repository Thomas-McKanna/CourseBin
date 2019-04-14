import React from "react";
import axios from "axios"
import './index.css'

import FormField from './util/form_field'
import SubmitButton from './util/submit_button'
import Warning from './util/warning'

class SearchForm extends React.Component {
    state = {
        schoolOptions: [],
        course: '',
        school: '',
        year: '',
        semester: '',
        username: '',
        professor: '',
        orderBy: 'date',
        warning: '',
    }
    
    constructor(props) {
        super(props)

        // constants
        this.courseNameTip = "Try formatting the course name like this: CS2300"
        this.buttonGroup = ['Date', 'Rating']
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
        this.handleSchoolNameChange = this.handleSchoolNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSemesterChange = this.handleSemesterChange.bind(this);
        this.handleProfessorChange = this.handleProfessorChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.formatSearchRequestCall = this.formatSearchRequestCall.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        if (this.state['course'] === '' || this.state['school'] === '') {
            this.setState({warning: 'Must provide a course number and '
                + 'school selection'});
            return;
        } else {
            this.setState({warning: ''});
        }

        const request = this.formatSearchRequestCall();
        console.log(request);

        var self = this; // bind "this" so that callbacks can use it
        axios.get(request)
        .then(function(response) {
            if (response.status === 200) {
                console.log(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
        return;
    }

    formatSearchRequestCall() {
        const st = this.state
        var course = st['course'] // validated in handle submit
        var school = st['school'] // validated in handle submit
        var semester = (st['semester'] === '' ? 'none': st['semester'])
        var year = (st['year'] === '' ? 'none': st['year'])
        var professor = (st['professor'] === '' ? 'none': st['professor'])
        var username = (st['username'] === '' ? 'none': st['username'])
        var orderBy = st['orderBy'] // ensured to be set by initial state
        var request = `/api/v1/search/course/${course}/school/${school}/time/`
            + `${semester}/${year}/user/${username}/professor/${professor}`
                + `/order/${orderBy}`;
        return request
    }

    handleCourseNameChange(event) {
        this.setState({course: event.target.value});
        return;
    }

    handleSchoolNameChange(event) {
        this.setState({school: event.target.value});
        return;
    }

    handleYearChange(event) {
        this.setState({year: event.target.value});
        return;
    }

    handleSemesterChange(event) {
        this.setState({semester: event.target.value});
        return;
    }

    handleProfessorChange(event) {
        this.setState({professor: event.target.value});
        return;
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
        return;
    }

    handleButtonChange(event) {
        var updated_value = '';
        if (event.target.value === "Rating") {
            updated_value = 'rating';
        } else if (event.target.value === "Date") {
            updated_value = 'date';
        }
        this.setState({orderBy: updated_value});
        return;
    }

    render() {
        return (
            <div className="form">
                {this.state['warning'] !== '' &&
                    <Warning 
                        msg={this.state['warning']}
                    />
                }
                <h2>Search For Content</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormField 
                        input
                        label="Course Name"
                        tip={this.courseNameTip}
                        placeholder="CS2300"
                        css_class="input"
                        handleFunc={this.handleCourseNameChange}/>
                    <FormField
                        select
                        options={this.state.schoolOptions}
                        label="School Name"
                        placeholder="CS2300"
                        css_class="input"
                        handleFunc={this.handleSchoolNameChange}/>
                    <FormField
                        input
                        aside="optional"
                        label="Year"
                        placeholder="2019"
                        css_class="input"
                        handleFunc={this.handleYearChange}/>
                    <FormField
                        input
                        aside="optional"
                        label="Semester"
                        placeholder="spring"
                        css_class="input"
                        handleFunc={this.handleSemesterChange}/>
                    <FormField
                        input
                        aside="optional"
                        label="Professor"
                        placeholder="gosnel"
                        css_class="input"
                        handleFunc={this.handleProfessorChange}/>
                    <FormField
                        input
                        aside="optional"
                        label="Username"
                        placeholder="yourfriend123"
                        css_class="input"
                        handleFunc={this.handleUsernameChange}/>
                    <FormField
                        radio
                        name="sortby"
                        buttons={this.buttonGroup}
                        label="Order Results By"
                        css_class="radio"
                        handleFunc={this.handleButtonChange}/>
                    <SubmitButton
                        label="Search"
                        handleFunc={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default SearchForm;
