import React, { Component } from 'react';
import "./LatestContractRow.css";
import Link from "../Link/Link";

class LatestContractRow extends Component {
    render() {
        let privateValue = 'no'
        if(this.props.data["v"] === '37' || this.props.data["v"] === '38'){
            privateValue = 'yes'
        }
        let timestamp
        if(this.props.data["timestamp"].toString().length === 19){
            timestamp = Number(this.props.data["timestamp"].toString().slice(0, -6))
        } else {
            timestamp = Number(this.props.data["timestamp"].toString() + "000")
        }
        let date = new Date(timestamp).toISOString().replace("T"," ").slice(0, -5)
        let to = this.props.data["to"]
        if(to === null){
            to = "Contract creation"
        } else {
            to =
                <Link
                    history={this.props.history}
                    type='account' >
                    {to}
                </Link>
        }
        return (
            <tr>
                <td>{date}</td>
                <td className="ellipsify">
                    <Link
                        history={this.props.history}
                        type='account' >
                        {this.props.data["address"]}
                    </Link>
                </td>
                <td className="ellipsify">
                    <Link
                        history={this.props.history}
                        type='transaction' >
                        {this.props.data["creationTransaction"]}
                    </Link>
                </td>
                <td className="ellipsify">
                    <Link
                        history={this.props.history}
                        type='accountTransactions'
                        valueId={this.props.data["address"]} >
                        {this.props.data["transactions"]}
                    </Link>
                </td>
            </tr>
        );
    }
}

export default LatestContractRow;