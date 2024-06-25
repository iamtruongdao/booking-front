import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, manageActions, CommonUtils } from "../../../utils";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genders: [],
      positions: [],
      roles: [],
      previewImgUrl: "",
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      role: "",
      position: "",
      gender: "",
      avatar: "",
      action: manageActions.CREATE,
    };
  }

  componentDidMount() {
    this.props.fetGenderStartRedux();
    this.props.fetPositionStartRedux();
    this.props.fetRoleStartRedux();
  }
  componentDidUpdate(prevProps) {
    //render -> update
    if (prevProps.genderRedux !== this.props.genderRedux) {
      const genders = this.props.genderRedux;
      this.setState({
        genders,
        gender: genders && genders.length > 0 && genders[0].keyMap,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      const positions = this.props.positionRedux;
      this.setState({
        positions,
        position: positions && positions.length > 0 && positions[0].keyMap,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      const roles = this.props.roleRedux;
      this.setState({
        roles,
        role: roles && roles.length > 0 && roles[0].keyMap,
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      const genders = this.props.genderRedux;
      const positions = this.props.positionRedux;
      const roles = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: genders && genders.length > 0 ? genders[0].keyMap : "",
        position: positions && positions.length > 0 ? positions[0].keyMap : "",
        role: roles && roles.length > 0 ? roles[0].keyMap : "",
        avatar: "",
        previewImgUrl: "",
        action: manageActions.CREATE,
        id: "",
      });
    }
  }
  handleOnchangeImg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: fileUrl,
        avatar: await CommonUtils.getBase64(file),
      });
    }
  };
  handleOnchange = (e, id) => {
    const copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };
  checkValidInput = () => {
    let isValid = true;
    const arrCheck = [
      "email",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "password",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        alert("missing" + arrCheck[i]);
        isValid = false;
        break;
      }
    }
    return isValid;
  };
  handleSave = () => {
    if (!this.checkValidInput()) {
      return;
    }
    if (this.state.action === manageActions.CREATE) {
      this.props.createUserStartRedux(this.state);
    }
    if (this.state.action === manageActions.EDIT) {
      this.props.editUserStartRedux(this.state);
    }
  };
  handleEditUserFromParents = (user) => {
    if (user) {
      let imageBuffer = "";

      if (user.image) {
        imageBuffer = new Buffer(user.image, "base64").toString("binary");
      }
      console.log(user);
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        role: user.roleId,
        position: user.positionId,
        gender: user.gender,
        previewImgUrl: imageBuffer,
        action: manageActions.EDIT,
      });
    }
  };
  render() {
    const { genders, positions, roles } = this.state;
    return (
      <div className="user-redux-container ">
        <div className="title">Manage user redux</div>
        <div className="user-redux-body">
          <div className="p-3">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">
                  <FormattedMessage id={"manage-user.email"} />
                </label>
                <input
                  disabled={
                    this.state.action === manageActions.EDIT ? true : false
                  }
                  onChange={(e) => this.handleOnchange(e, "email")}
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  value={this.state.email}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">
                  <FormattedMessage id={"manage-user.password"} />
                </label>
                <input
                  disabled={
                    this.state.action === manageActions.EDIT ? true : false
                  }
                  onChange={(e) => this.handleOnchange(e, "password")}
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  value={this.state.password}
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">
                <FormattedMessage id={"manage-user.first-name"} />
              </label>
              <input
                onChange={(e) => this.handleOnchange(e, "firstName")}
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                value={this.state.firstName}
              />
            </div>
            <div class="form-group">
              <label for="inputAddress2">
                <FormattedMessage id={"manage-user.last-name"} />
              </label>
              <input
                onChange={(e) => this.handleOnchange(e, "lastName")}
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                value={this.state.lastName}
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">
                  <FormattedMessage id={"manage-user.phone-number"} />
                </label>
                <input
                  onChange={(e) => this.handleOnchange(e, "phoneNumber")}
                  type="text"
                  class="form-control"
                  id="inputCity"
                  value={this.state.phoneNumber}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputCity">
                  <FormattedMessage id={"manage-user.address"} />
                </label>
                <input
                  onChange={(e) => this.handleOnchange(e, "address")}
                  type="text"
                  class="form-control"
                  id="inputCity"
                  value={this.state.address}
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">
                  <FormattedMessage id={"manage-user.gender"} />
                </label>
                <select
                  id="inputState"
                  class="form-control"
                  onChange={(e) => this.handleOnchange(e, "gender")}
                  value={this.state.gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {LANGUAGES.VI === this.props.language
                          ? item.valueVI
                          : item.valueEN}
                      </option>
                    ))}
                </select>
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">
                  <FormattedMessage id={"manage-user.position"} />
                </label>
                <select
                  id="inputState"
                  class="form-control"
                  onChange={(e) => this.handleOnchange(e, "position")}
                  value={this.state.position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {LANGUAGES.VI === this.props.language
                          ? item.valueVI
                          : item.valueEN}
                      </option>
                    ))}
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">
                  <FormattedMessage id={"manage-user.role"} />
                </label>
                <select
                  value={this.state.role}
                  id="inputState"
                  class="form-control"
                  onChange={(e) => this.handleOnchange(e, "role")}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {LANGUAGES.VI === this.props.language
                          ? item.valueVI
                          : item.valueEN}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div class="form-group col-md-3">
              <label for="inputCity">
                <FormattedMessage id={"manage-user.image"} />
              </label>
              <div className="preview-img-container">
                <label htmlFor="previewImg" className="label-upload">
                  Tải ảnh <i className="fas fa-upload"></i>
                </label>
                <input
                  onChange={(e) => this.handleOnchangeImg(e)}
                  type="file"
                  hidden
                  class="form-control"
                  id="previewImg"
                />
                <div
                  className="preview-img"
                  style={{
                    backgroundImage: `url(${this.state.previewImgUrl})`,
                  }}
                ></div>
              </div>
            </div>
            <button
              onClick={this.handleSave}
              type="submit"
              class="btn btn-primary"
            >
              {this.state.action === manageActions.CREATE ? (
                <FormattedMessage id={"manage-user.save"} />
              ) : (
                <FormattedMessage id={"manage-user.edit"} />
              )}
            </button>
            <div className="col-md-12">
              <TableManageUser
                handleEditUserFromParents={this.handleEditUserFromParents}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    language: state.app.language,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    listUsers: state.admin.listUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetGenderStartRedux: () => dispatch(actions.fetGenderStart()),
    fetPositionStartRedux: () => dispatch(actions.fetPositionStart()),
    fetRoleStartRedux: () => dispatch(actions.fetRoleStart()),
    createUserStartRedux: (data) => dispatch(actions.createNewUserStart(data)),
    editUserStartRedux: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
