import React from "react";
import axios from "axios"
import './style.css'

import { Redirect } from "react-router-dom";

import FormField from '../util/form_field'
import Warning from '../util/warning'
import SubmitButton from '../util/submit_button'


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
        searchWasMade: false,
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

        const queryString = this.getQueryString(this.state);

        this.setState({queryString: queryString})
        this.setState({searchWasMade: true})
        
        return;
    }

    getQueryString(st) {
        var params = []
        params.push('course=' + st['course'])
        params.push('school=' + st['school'])
        params.push(st['semester'] === '' ? '': ('semester=' + st['semester']))
        params.push(st['year'] === '' ? '': ('year=' + st['year']))
        params.push(st['professor'] === '' ? '': ('professor=' + st['professor']))
        params.push(st['username'] === '' ? '': ('username=' + st['username']))
        params.push('orderby=' + st['orderBy'])
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
                {this.state['searchWasMade'] && 
                    <Redirect push 
                        to={{
                            pathname: "/search",
                            search: this.state["queryString"],
                        }} />
                }
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
