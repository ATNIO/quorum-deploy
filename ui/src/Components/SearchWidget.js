import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

class SearchWidget extends Component {

    handleSearch(e) {
        if(document.getElementById("searchBox").value !== '') {

            let query = document.getElementById("searchBox").value

            document.getElementById("searchBox").value = ''

            this.props.history.push("/search/" + query)
        }

        e.preventDefault()
    }

    handleEnter(e) {
        if (e.keyCode === 13) document.getElementById('searchButton').click()
    }

    render() {
        return (
            <div className="Blocks">
                <Navbar.Form>
                    <FormGroup>
                        <FormControl
                            id="searchBox"
                            ref="searchQuery"
                            type="text"
                            placeholder="Search for Block, Account or Tx"
                            style={{width: 375}}
                            onKeyDown={this.handleEnter.bind(this)}/>
                    </FormGroup>
                    {' '}
                    <Button
                        onClick={this.handleSearch.bind(this)}
                        id="searchButton"
                        type="submit">
                        Submit
                    </Button>
                </Navbar.Form>
            </div>
        )
    }
}

export default SearchWidget;