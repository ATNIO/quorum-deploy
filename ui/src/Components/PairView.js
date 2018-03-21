import React, { Component } from 'react';
import Link from './Link/Link'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'


class PairView extends Component {

    handlePrivatePayload(input) {
        this.props.handlePrivatePayload(input)
    }

    render() {
        let key = ""
        let value
        if (this.props.valueKey && this.props.value !== null) {
            key = this.props.valueKey
            if (this.props.valueKey === "transactions") {
                if (this.props.location.pathname.includes("block")) {
                    let length = this.props.value
                    if (length === 1){
                        value = <span>
                            <Link
                                valueId={this.props.valueId}
                                history={this.props.history}
                                type='blockTransactions'>
                                {length}
                            </Link> transaction
                        </span>
                    } else if (length === 0){
                        value = <span>0 transactions</span>
                    } else {
                        value = <span>
                            <Link
                                valueId={this.props.valueId}
                                history={this.props.history}
                                type='blockTransactions'>
                                {length}
                            </Link> transactions
                        </span>
                    }
                } else {
                    let length = this.props.value
                    if (length === 1) {
                        value = <span>
                            <Link
                                valueId={this.props.valueId}
                                history={this.props.history}
                                type='accountTransactions'>
                                {length}
                            </Link> transaction
                        </span>
                    } else if (length === 0){
                        value = <span>0 transactions</span>
                    } else {
                        value = <span>
                            <Link
                                valueId={this.props.valueId}
                                history={this.props.history}
                                type='accountTransactions'>
                                {length}
                            </Link> transactions
                        </span>
                    }
                }
            } else if (key === "blockNumber" ||
                key === "blockHash" ||
                key === "parentHash") {
                value = <Link
                    history={this.props.history}
                    type='block' >
                    {this.props.value}
                </Link>
            } else if(key === "to" ||
                key === "from" ||
                key === "address") {
                value = <Link
                    history={this.props.history}
                    type='account' >
                    {this.props.value}
                </Link>
            } else if(key === "contractAddress") {
                key = "to"
                value =
                    <span>
                        Contract <Link
                        history={this.props.history}
                        type='account' >
                        {this.props.value}
                        </Link> created
                    </span>
            } else if (key === "transactionHash" ||
                key === "creationTransaction") {
                value = <Link
                    history={this.props.history}
                    type='transaction' >
                    {this.props.value}
                </Link>
            } else if ( key === "timestamp") {
                let timestamp
                if(this.props.value.toString().length === 19){
                    timestamp = Number(this.props.value.toString().slice(0, -6))
                } else {
                    timestamp = Number(this.props.value.toString() + "000")
                }
                value = new Date(timestamp).toISOString().replace("T"," ").slice(0, -5)
            } else if (key === "topics"){
                value= []
                for (let i = 0; i < this.props.value.length; ++i) {
                    value.push(<p style={{marginTop: 0, marginBottom: 0}}>[{i}] {this.props.value[i]}</p>)
                }
            } else {
                value = this.props.value
            }
        }
        return (
            <Row className="show-grid">
                <Col xs={3} md={2}><strong>{key}</strong>: </Col>
                <Col style={{overflowWrap: "break-word"}} xs={12} md={10}>{value}</Col>
            </Row>
        )
    }
}

export default PairView;