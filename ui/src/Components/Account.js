import React, { Component } from 'react';
import PairView from "./PairView";
import Panel from "react-bootstrap/lib/Panel";
import Grid from "react-bootstrap/lib/Grid";
import UploadMetadataForm from "./UploadMetadataForm";
import Tabs from "react-bootstrap/es/Tabs";
import Tab from "react-bootstrap/es/Tab";

class Account extends Component {
    componentWillMount(){
        if(!this.props.data["contractId"] && this.props.data["creationTransaction"]){
        }
    }

    render() {
        let content = []
        let keys = Object.keys(this.props.data)
        for(let i = 0; i < keys.length; i++) {
            if(this.props.data[keys[i]] !== null && keys[i] !== "contractId") {
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

export default Account;