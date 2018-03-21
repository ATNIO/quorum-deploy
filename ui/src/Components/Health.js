import React, { Component } from 'react';
import PairView from "./PairView";
import Grid from "react-bootstrap/lib/Grid"

class Health extends Component {

    constructor(){
        super()
        this.state = {
            components: []
        }
    }

    componentDidMount(){
        this.setState({
            components: this.props.components
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            components: nextProps.components
        })

    }

    render() {
        let content = [];
        if(this.state.components){
            let components = this.state.components
            for (let i = 0; i < components.length; i++) {
                let key = Object.keys(components[i])
                let innerKey = Object.keys(components[i][key])
                if (key[0] === "mongo") {
                    content.push(<h3 key="datasource"><strong>datasource</strong>:</h3>)
                    content.push(<PairView
                        key={key + innerKey[0]}
                        valueKey={innerKey[0]}
                        value={components[i][key][innerKey[0]]}
                    />)
                    content.push(<PairView
                        key={key + innerKey[1]}
                        valueKey={innerKey[1]}
                        value={"MongoDB v" + components[i][key][innerKey[1]]}
                    />)
                } else {
                    content.push(<h3 key={key}><strong>{key}</strong>:</h3>)
                    for (let j = 0; j < innerKey.length; j++) {
                        content.push(<PairView
                            key={key + innerKey[j]}
                            valueKey={innerKey[j]}
                            value={components[i][key][innerKey[j]]}
                        />)
                    }
                }
            }

        }
        return (
            <Grid fluid>
                {content}
            </Grid>
        );
    }
}

export default Health;