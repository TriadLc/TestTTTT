import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import _ from "lodash";
import { emitter } from "../../utils/emitter";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      console.log("Mayf cos chay k: ", this.props.currentUser);
      this.setState({
        id: user.id,
        email: user.email,
        password: "Opps, CANNOT SHOW YOUR PASSWORD",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
    console.log("Dimount edit modal: ", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleShowHidePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
    //console.log(this.state.showPassword);
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // call Api edit modal
      this.props.editUser(this.state);
    }
  };

  render() {
    console.log("Check props from parent", this.props);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email:</label>
              <input
                type="text"
                value={this.state.email}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
              />
            </div>
            <div className="input-container input-password-only">
              <label>Password:</label>
              <input
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
              />
              <span onClick={() => this.handleShowHidePassword()}>
                <i
                  className={
                    this.state.showPassword
                      ? "fas fa-eye show-password"
                      : "fas fa-eye-slash show-password"
                  }
                ></i>
              </span>
            </div>
            <div className="input-container">
              <label>Firstname:</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Lastname:</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address:</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>
          {""}
          <Button
            color="secondary}"
            onClick={() => {
              this.toggle();
            }}
          >
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
