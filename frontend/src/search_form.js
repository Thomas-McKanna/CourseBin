import React from "react";
import './index.css'

import FormField from './util/form_field'

class SearchForm extends React.Component {
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
    }

    handleSubmit(event) {
        console.log("TODO");

        // need tracking variables to track changes to sumbit
        // add submit button
        // prevent defaults event.preventdefault

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
                
                <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default SearchForm;