import React, { Component } from 'react';
import "./Link.css";
class Link extends Component {

    handleLink() {
        if (this.props.type === 'transaction') {
            this.props.history.push('/transaction/' + this.props.children)
        } else if (this.props.type === 'block') {
            this.props.history.push('/block/' + this.props.children)
        } else if (this.props.type === 'account') {
            this.props.history.push('/account/' + this.props.children)
        } else if (this.props.type === 'status') {
            this.props.history.push('/health')
        } else if (this.props.type === 'blockTransactions') {
            this.props.history.push('/block/' + this.props.valueId + "/transactions/1")
        } else if (this.props.type === 'accountTransactions') {
            this.props.history.push('/account/' + this.props.valueId + "/transactions/1")
        } else if (this.props.type === 'payload') {
            //perform ajax call to /api/payload and change value of input field of transactions
            this.props.handlePrivatePayload(this.props.children)
        } else {
            console.log("Link error")
        }
    }

    render() {
        let value = ""
        if (this.props.children) {
            value = this.props.children
        }
        return (
            <span className="Link" onClick={this.handleLink.bind(this)} >{value}</span>
        );
    }
}

export default Link;