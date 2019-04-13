import React from "react";
import axios from "axios"
import './index.css'

import FormField from './util/form_field'
import SubmitButton from './util/submit_button'

class SearchForm extends React.Component {
    state = {
        schoolOptions: []
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
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var self = this; // bind "this" so that callbacks can use it
        axios.get('/api/v1/schools/names')
        .then(function(response) {
            if (response.status === 200) {
                self.setState({ schoolOptions: response.data.result });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleSubmit(event) {
        console.log("TODO");
        event.preventDefault();

        return;
    }

    handleCourseNameChange(event) {
        console.log("TODO");
        return;
    }

    handleSchoolNameChange(event) {
        console.log("TODO");
        return;
    }

    handleYearChange(event) {
        console.log("TODO");
        return;
    }

    handleSemesterChange(event) {
        console.log("TODO");
        return;
    }

    handleProfessorChange(event) {
        console.log("TODO");
        return;
    }

    handleButtonChange(event) {
        console.log("TODO");
        return;
    }

    render() {
        return (
            <div className="form">
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