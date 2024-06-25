import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES, Roles } from "../../utils/constant";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { userMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
class Header extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };
  render() {
    const { processLogout, userInfo } = this.props;
    let menu = userInfo.roleId === Roles.Admin ? userMenu : doctorMenu;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={menu} />
        </div>
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id={"homeheader.welcome"} />!{" "}
            {this.props.userInfo?.firstName}
          </span>
          <span
            className={`languages-vi ${
              LANGUAGES.VI === this.props.language && "active"
            }`}
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VI
          </span>
          <span
            className={`languages-en ${
              LANGUAGES.EN === this.props.language && "active"
            }`}
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            title="Log out"
            onClick={processLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
        {/* nút logout */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageRedux: (languages) =>
      dispatch(actions.changeLanguageApp(languages)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
