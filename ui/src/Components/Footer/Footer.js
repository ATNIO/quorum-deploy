import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Health extends Component {
    render() {
        return (
            <Grid fluid>
                <Row >
                    <Col xs={12} md={4}></Col>
                    <Col xs={12} md={4} style={{textAlign: "center"}}>
                        <a
                            className="AutoReset"
                            href="mailto:contact@atn.io?subject=consortium-explorer-support"
                            target="_blank"
                            rel="noopener noreferrer">
                            Contact
                        </a>
                    </Col>
                    <Col xs={12} md={4} style={{textAlign: "center"}}>
                        <strong>&copy; {new Date().getFullYear()} ATN Foundation</strong>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Health;