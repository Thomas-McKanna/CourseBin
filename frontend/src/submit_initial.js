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

    handleCourseNameChange(event) {
        this.setState({course: event.target.value});
        return;
    }

    handleSchoolNameChange(event) {
        this.setState({school: event.target.value});
        return;
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

    render() {
        return (
            <div>
                <h2>Login Page</h2>
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
                    <SubmitButton
                        label="Submit"
                        handleFunc={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default SubmitInitial;