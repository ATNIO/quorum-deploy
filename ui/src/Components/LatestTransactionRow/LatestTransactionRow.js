import React, { Component } from 'react';
import "./LatestTransactionRow.css";
import Link from "../Link/Link";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Tooltip from "react-bootstrap/lib/Tooltip";

const tooltip = (
    <Tooltip id="tooltip">
        Private Transaction
    </Tooltip>
);

class LatestTransactionRow extends Component {
    render() {
        let privateValue = ''
        if(this.props.data["v"] === '37' || this.props.data["v"] === '38'){
            privateValue = <OverlayTrigger placement="top" overlay={tooltip}>
                <Glyphicon glyph="lock" />
            </OverlayTrigger>
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
                    {privateValue}&nbsp;
                    <Link
                        history={this.props.history}
                        type='transaction' >
                        {this.props.data["hash"]}
                    </Link>
                </td>
                <td className="ellipsify">
                    <Link
                        history={this.props.history}
                        type='account' >
                        {this.props.data["from"]}
                    </Link>
                </td>
                <td className="ellipsify">
                    {to}
                </td>
                <td>{this.props.data["value"]}</td>
            </tr>
        );
    }
}

export default LatestTransactionRow;