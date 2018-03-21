import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from "react-bootstrap/lib/Button";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import axios from 'axios'

class UploadMetadataForm extends Component {

    constructor(){
        super()
        this.state = {
            data: "",
            validationState: null
        }
    }

    handleClick(e){
        axios.post(this.props.server
            + '/api/upload?address='
            + this.props.address,
            JSON.parse(this.state.data))
            .then(response => {
                if(response.data === false){
                    this.setState({
                        validationState: "error"
                    })
                    document.getElementById("alert").innerHTML = "This metadata JSON does not" +
                        " correspond to this Contract or this is a private contract"
                    document.getElementById("alert").style.display = "inherit"
                } else {
                    this.setState({
                        validationState: "success"
                    })
                    document.getElementById("metadataFile").disabled = true
                    document.getElementById("alert").innerHTML = "Contract added to registry"
                    document.getElementById("alert").style.display = "inherit"
                }
                document.getElementById("uploadButton").disabled = true
            })
        e.preventDefault()
    }

    verifyFile(){
        document.getElementById("alert").style.display = "none"
        let file = document.getElementById("metadataFile")
        if(file.files[0]){
            let fileReader = new FileReader()
            let fileText = ""
            fileReader.onload = (fileLoadedEvent) => {
                fileText = fileLoadedEvent.target.result
                if (fileText.includes("compiler")
                    && fileText.includes("language")
                    && fileText.includes("output")
                    && fileText.includes("settings")){
                    this.setState({
                        data: fileText,
                        validationState: "success"
                    })
                    document.getElementById("uploadButton").disabled = false
                } else {
                    this.setState({
                        validationState: "error"
                    })
                    document.getElementById("uploadButton").disabled = true
                    document.getElementById("alert").innerHTML = "This is not a valid contract metadata JSON"
                    document.getElementById("alert").style.display = "inherit"
                }
            }
            fileReader.readAsText(file.files[0], "UTF-8")
        } else {
            this.setState({
                validationState: null
            })
            document.getElementById("uploadButton").disabled = true
        }
    }

    render() {
        return (
            <form style={{margin: "auto", width: "fit-content"}} onSubmit={this.handleClick.bind(this)}>
                <label>Upload Meta JSON</label>
                <FormGroup id="metadataFileGroup" validationState={this.state.validationState}>
                    <ControlLabel id="alert" style={{display: "none"}}>
                    </ControlLabel>
                    <FormControl
                        id="metadataFile"
                        type="file"
                        onChange={this.verifyFile.bind(this)}
                    />
                </FormGroup>
                <Button id="uploadButton"
                        type="submit"
                        bsSize="small"
                        bsStyle="primary"
                        disabled>
                    Submit
                </Button>
            </form>
        );
    }
}

export default UploadMetadataForm;