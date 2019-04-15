import './index.css'
import React from "react";


class SearchResults extends React.Component {
    render(props) {
        console.log(props)
        return (
            <div>
                <h3>{this.props.location['search']}</h3>
            </div>
        );
    }
}

export default SearchResults;