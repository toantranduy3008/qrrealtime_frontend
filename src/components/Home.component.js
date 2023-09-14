import React, { Component } from "react";
import { Container} from "reactstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successful: false,
      message: ""
    };

  }

  componentDidMount() {
  }

  

  render() {
    return (
      <Container fluid>
        <p>Trang chủ</p>       
      </Container>
    );
  }
}
