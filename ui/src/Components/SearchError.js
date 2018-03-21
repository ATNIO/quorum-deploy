import React, { Component } from 'react';

class SearchError extends Component {
    render() {
        let query = this.props.query
        let content
        if(this.props.hashError){
            content = 'Ooops, ' + query + ' is a block or transaction that does not exist!'
        } else {
            content = 'Ooops, ' + query + ' is an invalid search!'
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default SearchError;