import React from "react";

class FileUploadManager extends React.Component {

    state = {
        fileInputs: [],
    }

    constructor(props) {
        super(props);
        this.state.fileInputs.push(<FileInput
            key={0}
            id={0}
            fileInput={this.props.fileInput}
            handleFileChange={this.handleFileChange}
            handleRemoveFile={this.handleRemoveFile}/>)

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleRemoveFile = this.handleRemoveFile.bind(this);
        this.handleAddFile = this.handleAddFile.bind(this);
    }

    handleFileChange(event) {
        console.log(event);
    }

    handleRemoveFile(event, index) {
        console.log(index)
    }

    handleAddFile(event) {
        console.log(event)
    }

    render() {
        return (
            <div className="file_inputs">
                {this.state.fileInputs}
            </div>
        );
    }
}

class FileInput extends React.Component {

    state = {
        filePresent: false,
        addFileButtonPresent: false,
    }

    constructor(props) {
        super(props);

        this.handleRemoveFile = this.handleRemoveFile.bind(this);
    }

    handleRemoveFile(event) {
        this.setState( {filePresent: !this.state.filePresent});
    }

    render() {
        console.log(this.props)
        return (
            <li>
                <input 
                    type="file" 
                    ref={this.props.fileInput} 
                    onChange={ (e) => {
                        this.setState( {filePresent: !this.state.filePresent});
                        this.props.handleFileChange(e.target.files);
                    }}/>
                { this.state.filePresent &&
                    <button onClick={ (e) => this.props.handleRemoveFile(e, this.props.id)}>Remove</button>
                }   
            </li>
        );
    }
}

export default FileUploadManager;