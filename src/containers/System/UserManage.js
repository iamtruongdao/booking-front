import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManager.scss";
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import emitter from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      isOpenModal: false,
      isOpenEdit: false,
      currentUser: {},
    };
  }
  handleAddNewUser = () => {
    this.setState({ isOpenModal: true });
  };
  toggleUserModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  };
  toggleEditModal = () => {
    this.setState({ isOpenEdit: !this.state.isOpenEdit });
  };
  async componentDidMount() {
    await this.getAllUser();
  }
  getAllUser = async () => {
    let data = await getAllUsers("ALL");
    if (data && data.errCode === 0) {
      this.setState({
        userData: data.user,
      });
    }
  };
  createNewUsers = async (data) => {
    try {
      const res = await createNewUser(data);
      if (res.errCode === 0 && res) {
        await this.getAllUser();
        this.setState({ isOpenModal: false });
        emitter.emit("EVENT_CLEAR_DATA_USER");
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDeleteUser = async (data) => {
    const res = await deleteUser(data.id);
    if (res && res.errCode === 0) {
      await this.getAllUser();
    } else {
      alert(res.message);
    }
  };
  handleEditUser = (data) => {
    this.setState({ isOpenEdit: true, currentUser: data });
  };
  doUpdateUser = async (data) => {
    const res = await updateUser(data);
    if (res && res.errCode === 0) {
      await this.getAllUser();
      this.setState({ isOpenEdit: false });
    } else {
      alert("missing");
    }
  };
  render() {
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggle={this.toggleUserModal}
          createNewUser={this.createNewUsers}
        />
        {this.state.isOpenEdit && (
          <ModalEditUser
            toggle={this.toggleEditModal}
            isOpen={this.state.isOpenEdit}
            currentUser={this.state.currentUser}
            doUpdateUser={this.doUpdateUser}
          />
        )}

        <div className="text-center">Manage users</div>
        <div className="mx-1">
          <div onClick={this.handleAddNewUser} className="btn btn-primary px-3">
            Add new users
          </div>
        </div>
        <div>
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {this.state?.userData.map((item, index) => (
              <tr>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <tr>
                  <td>
                    <button onClick={() => this.handleEditUser(item)}>
                      edit
                    </button>
                    <button onClick={() => this.handleDeleteUser(item)}>
                      delete
                    </button>
                  </td>
                </tr>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
