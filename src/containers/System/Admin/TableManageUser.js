import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mParser = new MarkdownIt();

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange: ", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };

  render() {
    //console.log("HoiDanIt check all users: ", this.props.listUsers);
    //console.log("HoiDanIt check state: ", this.state.userRedux);
    let arrUsers = this.state.userRedux;
    return (
      <React.Fragment>
        <table id="TableManageUser" className="my-3">
          <tbody>
            <tr>
              <th>
                <FormattedMessage id="manage-user.id" />
              </th>
              <th>
                <FormattedMessage id="manage-user.email" />
              </th>
              <th>
                <FormattedMessage id="manage-user.first-name" />
              </th>
              <th>
                <FormattedMessage id="manage-user.last-name" />
              </th>
              <th>
                <FormattedMessage id="manage-user.gender" />
              </th>
              <th>
                <FormattedMessage id="manage-user.position" />
              </th>
              <th>
                <FormattedMessage id="manage-user.role-id" />
              </th>
              <th>
                <FormattedMessage id="manage-user.phone-number" />
              </th>
              <th>
                <FormattedMessage id="manage-user.address" />
              </th>
              <th>
                <FormattedMessage id="manage-user.btn-actions" />
              </th>
            </tr>

            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td id="row-tbl-id">{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td id="row-tbl-gender">{item.gender}</td>
                    <td id="row-tbl-position">{item.positionId}</td>
                    <td id="row-tbl-role">{item.roleId}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.address}</td>
                    <td id="row-tbl-action">
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteUser(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
