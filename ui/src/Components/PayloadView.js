import React, { Component } from 'react';
import Button from "react-bootstrap/lib/Button";
import axios from "axios";
import Collapse from "react-bootstrap/lib/Collapse";
import Well from "react-bootstrap/lib/Well";

class PayloadView extends Component {
    constructor(props){
        super(props)
        this.state = {
            input: '',
            showingPayload: false,
            payload: ''
        }
    }

    componentWillMount() {
        this.setState({
            input: this.props.value
        })
    }

    handleClick() {
        if (!this.state.showingPayload){
            axios.get(this.props.server + '/api/payload?value=' + this.state.input)
                .then(result => {
                    this.setState({
                        payload: result.data.result,
                        showingPayload: true
                    })
                })
        } else {
            this.setState({
                showingPayload: false
            })
        }
    }

    render() {
        let input = this.state.input
        let payload = ''
        if(this.state.showingPayload){
            payload = this.state.payload
        }
        return (
            <div>
                {input}
                <br />
                <Button
                    bsSize="small"
                    bsStyle="primary"
                    onClick={this.handleClick.bind(this)}>
                    {this.state.showingPayload ? 'Hide Payload' : 'Show Payload'}
                </Button>
                <br />
                <Collapse in={this.state.showingPayload}>
                    <div>
                        <Well>
                            {payload}
                        </Well>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default PayloadView;