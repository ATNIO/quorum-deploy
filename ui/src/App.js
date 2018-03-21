import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Route, Switch, Redirect
} from 'react-router-dom'

import './App.css'
import Result from './Containers/Result'
import Latest from './Containers/Latest'
import Header from './Components/Header/Header'
import Health from "./Components/Health";
import Footer from "./Components/Footer/Footer";
import Search from "./Containers/Search";

class App extends Component {

    constructor(){
        super()
        let server = process.env.REACT_APP_EXPLORER || 'http://localhost:8081'
        this.state = {
            server: server,
            isLoading: false,
            serverComponents: []
        }
        //scroll listener
        window.onscroll = function() {}
    }

    makeLoading(){
        this.setState({
            isLoading: true
        })
    }

    setComponents(components) {
        this.setState({
            serverComponents: components
        })
    }

    render() {
        return (
            <Router >
                <div className="App">
                    <div>
                    <Route render={(props) => {
                        return(
                            <div>
                                <Header history={props.history}
                                        pushComponents={this.setComponents.bind(this)}
                                        server={this.state.server}/>
                            </div>
                        )
                    }}/>
                    </div>
                    <div className="Content">
                        <Switch>
                            <Route path="/" exact render={() => (
                                <Redirect to="/blocks/latest/0"/>
                            )}/>
                            <Route path="/search/:query" render={(props) => {
                                return(
                                    <Search history={props.history}
                                            match={props.match}
                                            location={props.location}
                                            makeLoading={this.makeLoading.bind(this)}
                                            server={this.state.server}/>
                                )
                            }}/>
                            {["/transactions/latest/:page",
                                "/blocks/latest/:page",
                                "/block/:value/transactions/:page",
                                "/account/:value/transactions/:page"].map(path =>
                                <Route path={path} render={(props) => {
                                    return(
                                        <Latest history={props.history}
                                                match={props.match}
                                                location={props.location}
                                                server={this.state.server}/>
                                    )
                                }}/>
                            )}
                            {["/transaction/:value",
                                "/block/:value",
                                "/account/:value"].map(path =>
                                <Route path={path} render={(props) => {
                                    return(
                                        <Result history={props.history}
                                                match={props.match}
                                                location={props.location}
                                                makeLoading={this.state.isLoading}
                                                server={this.state.server}/>
                                    )
                                }}/>
                            )}
                            <Route path="/health" render={() => {
                                return(
                                    <Health components={this.state.serverComponents}/>
                                )
                            }}/>
                        </Switch>
                    </div>
                    <div>
                        <Route component={Footer} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App
