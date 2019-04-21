import './style.css'
import SubmissionListItem from './submission_list_item'
import React from "react";
import axios from "axios"

const queryString = require('query-string')

class SearchResults extends React.Component {

    state = {
        entries: [],
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location['search']);
        const course = parsed['course'] ? parsed['course'] : 'none';
        const school = parsed['school'] ? parsed['school'] : 'none';
        const semester = parsed['semester'] ? parsed['semester'] : 'none';
        const year = parsed['year'] ? parsed['year'] : 'none';
        const username = parsed['username'] ? parsed['username'] : 'none';
        const professor = parsed['professor'] ? parsed['professor'] : 'none';
        const orderBy = parsed['orderBy'] ? parsed['orderBy'] : 'none';

        const apiRequest = (`/api/v1/search/course/${course}/school/${school}`
            + `/time/${semester}/${year}/user/${username}/professor/`
            + `${professor}/order/${orderBy}`)

        var self = this; // bind "this" so that callbacks can use it
        axios.get(apiRequest)
        .then(function(response) {
            if (response.status === 200) {
                self.setState({ entries: response.data.result });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render(props) {
        const entries = this.state['entries'];
        var listOfEntries;
        if (entries.length !== 0) {
            listOfEntries = entries.map((entry) => 
                <SubmissionListItem
                    key={entry['username'] + entry['course']}
                    id={entry['id']}
                    courseName={entry['name']}
                    courseNo={entry['number']}
                    school={entry['school_name']}
                    year={entry['year']}
                    semester={entry['semester']}
                    professor={entry['professor']}
                    username={entry['username']}
                />
            );
        }
        else {
            listOfEntries = (
                <li>Loading...</li>
            )
        }

        return (
            <div className="search_results">
                <h2>Search Results</h2>
                <hr></hr>
                <ul className="submission">
                    {listOfEntries}
                </ul>
            </div>
        );
    }
}

export default SearchResults;