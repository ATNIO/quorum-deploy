import React, { Component } from 'react';
import axios from "axios"
import Block from "../Components/Block";
import Account from "../Components/Account";
import Transaction from "../Components/Transaction";

class Result extends Component {

    block = this.props.server + '/api/block?value='
    account= this.props.server + '/api/account?value='
    transaction = this.props.server + '/api/transaction?value='

    constructor(props){
        super(props)
        this.state = {
            title: "",
            data: [],
            isLoading: true,
            hasError: false,
            showingPayload: false
        }
    }

    componentWillMount(){
        if(this.props.match.params.value) {
            if(this.props.location.state !== undefined) {
                this.handleNewData(this.props.location.state.data)
            } else {
                this.handleQuery(this.props.match.params.value)
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.key !== nextProps.location.key) {
            if(nextProps.makeLoading){
                this.setState({
                    isLoading: nextProps.makeLoading
                })
            }
            this.handleQuery(nextProps.match.params.value)
        }
    }

    handleNewData(result) {
        let title = result.type.charAt(0).toUpperCase() + result.type.slice(1);
        this.setState( {
            title: title,
            data: result.result,
            isLoading: false
        })
    }

    handleQuery(query) {
        this.setState({
            isLoading: true
        })
        if (this.props.history.location.pathname.includes('transaction')) {
            this.submitQuery(query, this.transaction)
        } else if (this.props.history.location.pathname.includes('block')) {
            this.submitQuery(query, this.block)
        } else if (this.props.history.location.pathname.includes('account')) {
            this.submitQuery(query, this.account)
        }
    }

    submitQuery(query, root) {
        axios.get(root + query)
            .then(result => {
                let title = result.data.type.charAt(0).toUpperCase() + result.data.type.slice(1);
                if (!result.data.error.message) {
                    this.setState({
                        title: title,
                        data: result.data.result,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        title: title,
                        data: result.data.error.message,
                        hasError: true,
                        isLoading: false
                    })
                }
            })
    }

    render() {
        let content = [];
        if (this.state.isLoading === false && this.state.data) {
            if(this.state.hasError){
                content = <div style={{textAlign: "center"}}>{this.state.data}</div>
            } else {
                if (this.props.history.location.pathname.includes("block")) {
                    content.push(<Block title={this.state.title}
                                        data={this.state.data}
                                        match={this.props.match}
                                        location={this.props.location}
                                        history={this.props.history}
                                        server={this.props.server}/>)
                } else if (this.props.history.location.pathname.includes("account")){
                    content.push(<Account title={this.state.title}
                                        data={this.state.data}
                                        match={this.props.match}
                                        location={this.props.location}
                                        history={this.props.history}
                                        server={this.props.server}/>)
                } else if (this.props.history.location.pathname.includes("transaction")) {
                    content.push(<Transaction title={this.state.title}
                                          data={this.state.data}
                                          match={this.props.match}
                                          location={this.props.location}
                                          history={this.props.history}
                                          server={this.props.server}/>)
                }
            }
        } else {
            content = 'Loading...'
        }
        return (
            <div>
                {content}
            </div>

        );
    }
}


export default Result;