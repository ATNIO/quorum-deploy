import React, { Component } from 'react';
import PairView from "./PairView";
import Tab from "react-bootstrap/lib/Tab";
import Panel from "react-bootstrap/lib/Panel";
import Grid from "react-bootstrap/lib/Grid";
import Tabs from "react-bootstrap/lib/Tabs";

class TransactionEvents extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        if(this.state.data !== this.props.data){
            this.setState({
                data: this.props.data
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.data !== nextProps.data){
            this.setState({
                data: nextProps.data
            })
        }
    }

    render() {
        let content = []
        if(this.state.data.length > 0){
            let keys = Object.keys(this.state.data)
            for (let i = 0; i < keys.length; ++i) {
                let innerKeys = Object.keys(this.state.data[keys[i]])
                for (let j = 0; j < innerKeys.length; ++j){
                    if(this.state.data[keys[i]][innerKeys[j]] !== null){
                        content.push(<PairView
                            location={this.props.location}
                            history={this.props.history}
                            key={keys[i] + innerKeys[j]}
                            valueKey={innerKeys[j]}
                            value={this.state.data[keys[i]][innerKeys[j]]}
                        />)
                    }
                }
            }
            if (this.state.data.length > 1) {
                for (let i = 0; i < this.state.data.length; ++i) {
                    content[i] =
                        <Tab eventKey={i} title={i}>
                            <Panel>
                                <Grid fluid>{content[i]}</Grid>
                            </Panel>
                        </Tab>
                }
                content =
                    <Tabs bsStyle="pills" defaultActiveKey={0} id="event-tabs">
                        content
                    </Tabs>
            }
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default TransactionEvents;