import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: null,
            currentSession: null,
            currentVersion: null
        }
    }

    componentDidMount() {
        setInterval(this.onAutoRefresh, 60000);
    }

    render() {
        return (
            // <div class="navbar fixed-bottom">
            <footer id="sticky-footer" className="flex-shrink-0 py-1 bg-info text-white fixed-bottom">
                <Container className="text-center" style={{ fontSize: '10px' }}>
                    Powered by Napas
                </Container>
            </footer>
            // </div>
        );
    }
}

export default Footer;