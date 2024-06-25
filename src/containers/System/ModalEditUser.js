import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      address: "",
    };
  }
  handleOnchangeInput = (e, id) => {
    let copyState = this.state;
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    const arrInput = ["email", "password", "lastName", "firstName", "address"];
    for (let index = 0; index < arrInput.length; index++) {
      if (!this.state[arrInput[index]]) {
        isValid = false;
        alert("missing " + arrInput[index]);
        break;
      }
    }
    return isValid;
  };
  handleEditUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.doUpdateUser(this.state);
    }
  };
  componentDidMount() {
    const user = this.props.currentUser;
    if (!_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "user.password",
        lastName: user.lastName,
        firstName: user.firstName,
        address: user.address,
      });
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Update user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                value={this.state.email}
                onChange={(e) => this.handleOnchangeInput(e, "email")}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={(e) => this.handleOnchangeInput(e, "password")}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(e) => this.handleOnchangeInput(e, "firstName")}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(e) => this.handleOnchangeInput(e, "lastName")}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(e) => this.handleOnchangeInput(e, "address")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={this.handleEditUser}
          >
            Save change
          </Button>
          <Button color="secondary" className="px-3" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
