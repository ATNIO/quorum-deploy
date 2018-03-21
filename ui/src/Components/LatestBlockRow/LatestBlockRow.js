import React, { Component } from 'react';
import "./LatestBlockRow.css"
import Link from "../Link/Link";

class LatestBlockRow extends Component {
    render() {
        let timestamp
        if(this.props.data["timestamp"].toString().length === 19){
            timestamp = Number(this.props.data["timestamp"].toString().slice(0, -6))
        } else {
            timestamp = Number(this.props.data["timestamp"].toString() + "000")
        }
        let date = new Date(timestamp).toISOString().replace("T"," ").slice(0, -5)

        let tCount
        if(this.props.data["transactions"] === 0){
            tCount = "0"
        } else {
            tCount = <Link
                history={this.props.history}
                type='blockTransactions'
                valueId={this.props.data["number"]} >
                {this.props.data["transactions"]}
            </Link>
        }

        if (this.props.data["number"] === 0) {
            return (
                <tr>
                    <td>0</td>
                    <td className="ellipsify">
                        <Link
                            history={this.props.history}
                            type='block' >
                            0
                        </Link>
                    </td>
                    <td className="ellipsify">
                        <Link
                            history={this.props.history}
                            type='block' >
                            {this.props.data["hash"]}
                        </Link>
                    </td>
                    <td>
                        {tCount}
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{date}</td>
                    <td className="ellipsify">
                        <Link
                            history={this.props.history}
                            type='block' >
                            {this.props.data["number"]}
                        </Link>
                    </td>
                    <td className="ellipsify">
                        <Link
                            history={this.props.history}
                            type='block' >
                            {this.props.data["hash"]}
                        </Link>
                    </td>
                    <td>
                        {tCount}
                    </td>
                </tr>
            );
        }

    }
}

export default LatestBlockRow;