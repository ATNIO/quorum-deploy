import React, { Component } from 'react';
import axios from 'axios'
import asyncPoll from 'react-async-poll';
import Link from "../Link/Link";
import "./ServerHealth.css";

class ServerHealthWidget extends Component {

    constructor(){
        super()
        this.state = {
            health: {}
        }
    }

    signalHealthCheck() {
        axios.create({
            timeout: 5000
        })
        .get(this.props.server + '/health')
        .then(result => {
            let keys = Object.keys(result.data)
            let health = {status: result.data.status}
            let components = []
            for(let i = 1; i < keys.length; ++i){
                let component = {}
                component[keys[i]] = result.data[keys[i]]
                components.push(component)
            }
            this.setState({
                health: health
            })
            this.props.pushComponents(components)
        })
        .catch(error => {
            let server = {status: "DOWN", error: error.message}
            let component = {}
            component["server"] = server
            let health = {status: "DOWN"}
            let components = []
            components.push(component)
            this.setState({
                health: health
            })
            this.props.pushComponents(components)
        })
    }

    render() {
        let health

        let indicator
        if(this.state.health){
            switch (this.state.health.status) {
                case "UP" :
                    indicator = <span className='Sphere Green'></span>
                    break;
                case "SYNCING" :
                    indicator = <span className='Sphere Yellow'></span>
                    break;
                default:
                    indicator = <span className='Sphere Red'></span>
            }
            health =
                <div>
                    <strong>status</strong>: {indicator} &#8202;
                    <Link
                        history={this.props.history}
                        type='status' >
                        {this.state.health.status}
                    </Link>
                </div>
        }

        return (
            <div>
                <button
                    id="showHealth"
                    onClick={this.signalHealthCheck.bind(this)}
                    style={{display: "none"}}
                />
                {health}
            </div>
        );
    }
}

const onPollInterval = (props, dispatch) => {
    return document.getElementById("showHealth").click();
}

export default asyncPoll(10 * 1000, onPollInterval)(ServerHealthWidget)