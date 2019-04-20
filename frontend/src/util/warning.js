import React from "react";
import "./style.css";

class Warning extends React.Component {
    render() {
        return (
            <div className="warning_box">
                <div className="warning_text">
                    {this.props.msg}
                </div>
            </div>
        );
    }
}

export default Warning;