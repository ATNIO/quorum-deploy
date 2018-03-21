import React, { Component } from 'react';

import {Link} from "react-router-dom";
import ServerHealthWidget from "../ServerHealthWidget/ServerHealthWidget"
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar';
import Image from 'react-bootstrap/lib/Image'

import logo from "../../logo.png"
import SearchWidget from "../SearchWidget";


class Navigation extends Component {

    makeLoading(){
        this.props.makeLoading()
    }

    pushComponents(components) {
        this.props.pushComponents(components)
    }

    render() {
        return (
            <div>
                <Navbar >
                    <Navbar.Header>
                        <Navbar.Brand pullLeft>
                            <a
                                href="https://atn.io">
                                <Image
                                    style={{height: "100%"}}
                                    src={logo}
                                    alt="Logo"/>
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse >
                        <Navbar.Text>
                            <Link
                                to="/blocks/latest/1">
                                Latest Blocks
                            </Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Link to="/transactions/latest/1">
                                Latest Transactions
                            </Link>
                        </Navbar.Text>
                        <Navbar.Text pullRight>
                            <ServerHealthWidget
                                server={this.props.server}
                                pushComponents={this.pushComponents.bind(this)}
                                history={this.props.history}/>
                        </Navbar.Text>
                        <Nav pullRight>
                            <SearchWidget history={this.props.history}/>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;