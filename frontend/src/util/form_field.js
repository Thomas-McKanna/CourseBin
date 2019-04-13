import React from "react";
import Tip from './tip';

class FormFieldHeader extends React.Component {
    render() {
        let aside;

        if (this.props.aside) {
            aside = <span className="aside">{this.props.aside}</span>
        } else {
            aside = '';
        }

        return (
            <div>
                <h3>{this.props.label}</h3> {aside}
                <hr/>
            </div>
        );
    }
}

class FormFieldRadioButtonGroup extends React.Component {
    render() {
        const buttons = this.props.buttons;
        const radioButtons = buttons.map((button) =>
            <FormFieldRadioButton key={button}
                name={this.props.name}
                value={button} 
                handleFunc={this.props.handleFunc} />
        );

        return (
            <div className="radio_buttons">
                {radioButtons}
            </div>
        );
    }
}


class FormFieldRadioButton extends React.Component {
    render() {
        return (
            <span>
                <input type="radio" name={this.props.name} value={this.props.value} onChange={this.props.handleFunc}/>
                <label>{this.props.value}</label>
            </span>
        );
    }
}

class FormField extends React.Component {
    render() {
        let tip;
        let thePlaceholder;
        let input;

        if (this.props.tip) {
            tip = <Tip tip={this.props.tip}/>
        } else {
            tip = null;
        }

        if (this.props.placeholder) {
            thePlaceholder = this.props.placeholder;
        } else {
            thePlaceholder = '';
        }

        if (this.props.input) {
            input = <input type="text" placeholder={thePlaceholder} onChange={this.props.handleFunc} />
        } 

        if (this.props.radio) {
            input = <FormFieldRadioButtonGroup name={this.props.name} buttons={this.props.buttons} handleFunc={this.props.handleFunc}/>
        }
        
        if (this.props.select) {
            const options = this.props.options.map((school) =>
                <option key={school.school_code}
                    value={school.school_code} 
                >{school.school_name}</option>
            );

            input = (
                <select>
                    {options}
                </select>
            );
        }

        return (
            <div className={this.props.css_class}>
                <FormFieldHeader aside={this.props.aside} label={this.props.label}/>
                {tip}
                {input}
            </div>
        );
    }
}

export default FormField;