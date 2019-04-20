import React from "react";
import "./style.css";

class Tip extends React.Component {
    render() {
        return (
            <div className="tip_box">
                <div className="tip_text">
                    <b><i>Tip -</i></b> {this.props.tip}
                </div>
            </div>
        );
    }
}

export default Tip;