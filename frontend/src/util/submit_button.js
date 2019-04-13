import React from "react";

class SubmitButton extends React.Component {
    render() {
        return (
            <div>
                <input className="submit_btn" type="submit" value={this.props.label} />
            </div>
        );
    }
}

export default SubmitButton;