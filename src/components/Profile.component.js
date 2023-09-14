import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/Auth.service";
import {
  Card, Container
} from 'reactstrap';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      isUserMyPasswordModalOpen: false,
      currentUser: { username: "" }
    };

    this.onUserMyPasswordModalOpen = this.onUserMyPasswordModalOpen.bind(this);
    this.closeUserMyPasswordModal = this.closeUserMyPasswordModal.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  onUserMyPasswordModalOpen() {
    this.setState({
      isUserMyPasswordModalOpen: !this.state.isUserMyPasswordModalOpen
    });
  }

  closeUserMyPasswordModal() {
    this.setState({
      isUserMyPasswordModalOpen: false
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <Container>
        <Card>
          {(this.state.userReady) ?
            <div>
              <header className="jumbotron">
                <h3>
                  <strong>{currentUser.username}</strong> Profile
                </h3>
              </header>
              <p>
                <strong>Id:</strong>{" "}
                {currentUser.id}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.scopes &&
                  currentUser.scopes.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
            </div> : null}
        </Card>
      </Container>
    );
  }
}
