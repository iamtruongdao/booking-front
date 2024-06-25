import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLoginApi } from "../../services/userService";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";

class Login extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnchangeUsername = (e) => {
    this.setState((prey) => ({
      ...prey,
      username: e.target.value,
    }));
  };
  handleOnchangePassword = (e) => {
    this.setState((prey) => ({
      ...prey,
      password: e.target.value,
    }));
  };
  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);

      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      } else {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      console.log(error);
      this.setState({
        errMessage: error.response?.data?.message,
      });
    }
  };
  handleOnKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      this.handleLogin();
    }
  };
  handleShowHidePassword = () => {
    this.setState((prey) => ({
      ...prey,
      isShowPassword: !this.state.isShowPassword,
    }));
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12  text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.usename}
                onChange={(e) => this.handleOnchangeUsername(e)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(e) => this.handleOnchangePassword(e)}
                  onKeyDown={(e) => this.handleOnKeyDown(e)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    class={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 " style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 ">
              <button
                className="btn-login"
                onClick={(e) => this.handleLogin(e)}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span>Or Login with:</span>
            </div>
            <div className="col-12 social-login mtnpm-3">
              <i class="fab fa-google-plus-g google"></i>

              <i class="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
