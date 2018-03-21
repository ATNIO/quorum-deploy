import React, { Component } from 'react';
import PairView from "./PairView";
import Panel from "react-bootstrap/lib/Panel";
import Grid from "react-bootstrap/lib/Grid";

class Block extends Component {
    render() {
        let content = []
        let keys = Object.keys(this.props.data)
        for(let i = 0; i < keys.length; i++) {
            if(this.props.data[keys[i]] !== null) {
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
        return (
            <div>
                <h4>{this.props.title}</h4>
                <Panel>
                    <Grid fluid>
                        {content}
                    </Grid>
                </Panel>
            </div>
        );
    }
}

export default Block;