import React, { Component } from 'react';
import PairView from "./PairView";
import Panel from "react-bootstrap/lib/Panel";
import Grid from "react-bootstrap/lib/Grid";
import PayloadView from "./PayloadView";

class Transaction extends Component {
    render() {
        let content = []
        let keys = Object.keys(this.props.data)
        for(let i = 0; i < keys.length; i++) {
            if(this.props.data[keys[i]] !== null && keys[i] !== "logs") {
                if((this.props.data["v"] === '37' || this.props.data["v"] === '38')
                    && keys[i] === 'input'
                    && !this.props.showingPayload){
                    content.push(<PairView
                        valueId={this.props.match.params.value}
                        location={this.props.location}
                        history={this.props.history}
                        key={keys[i]}
                        valueKey={keys[i]}
                        value={<PayloadView
                            server={this.props.server}
                            value={this.props.data[keys[i]]}/>}
                    />)
                } else if (this.props.data["to"] === null
                    && keys[i] === 'contractAddress') {
                    content.push(<PairView
                        valueId={this.props.match.params.value}
                        location={this.props.location}
                        history={this.props.history}
                        key={keys[i]}
                        valueKey={keys[i]}
                        value={this.props.data[keys[i]]}
                    />)
                } else {
                    content.push(<PairView
                        valueId={this.props.match.params.value}
                        location={this.props.location}
                        history={this.props.history}
                        key={keys[i]}
                        valueKey={keys[i]}
                        value={this.props.data[keys[i]]}
                    />)
                }

            }
        }
        content =
            <Panel>
                <Grid fluid>
                    {content}
                </Grid>
            </Panel>
        return (
            <div>
                <h4>{this.props.title}</h4>
                {content}
            </div>
        );
    }
}

export default Transaction;