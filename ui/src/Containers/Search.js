import React, { Component } from 'react';
import axios from "axios";
import SearchError from "../Components/SearchError";
import {Redirect} from "react-router-dom";

class Search extends Component {

    root = this.props.server + '/api/search?value='

    constructor(props) {
        super(props)
        this.state = {
            type: {},
            query: {},
            data: {},
            hasError: false,
            isLoading: true
        }
    }

    componentWillMount() {
        let query = this.props.match.params.query
        this.props.makeLoading()
        this.submitQuery(query, this.root)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.key !== nextProps.location.key) {
            let query = nextProps.match.params.query
            nextProps.makeLoading()
            this.submitQuery(query, this.root)
        }
    }

    submitQuery(query, root) {
        axios.get(root + query)
            .then(result => {
                if(result.data.error.message) {
                    this.setState({
                        query: query,
                        data: result.data.error,
                        hasError: true,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        type: result.data.type,
                        query: query,
                        data: result.data,
                        hasError: false,
                        isLoading: false
                    })
                }
            })
    }

    render() {
        let content
        if(!this.state.isLoading){
            if (!this.state.hasError) {
                content = <Redirect push={false} to={{
                    pathname: '/' + this.state.type + '/' + this.state.query,
                    state: { data: this.state.data }
                }}/>
            } else {
                if (this.state.data === "Invalid query"){
                    content = <SearchError query={this.state.query}/>
                } else {
                    content = <SearchError query={this.state.query} hashError={true}/>
                }
            }

        } else {
            content = 'Loading...'
        }
        return (
            <div style={{textAlign: "center"}}>
                {content}
            </div>
        )

    }
}

export default Search;