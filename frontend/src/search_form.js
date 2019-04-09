import React from "react";
import './index.css'

class SearchForm extends React.Component {
    render() {
        return (
            <div className="form">
                <FormField label="Course Name"/>
                <FormField label="School"/>
                <FormField label="Professor"/>
            </div>
        );
    }
}

class FormField extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.label}</h3>
                <hr/>
            </div>
        );
    }
}

export default SearchForm;