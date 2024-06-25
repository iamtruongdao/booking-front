import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import { connect } from "react-redux";
import Logo from "../../assets/images/logo";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router-dom";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageReduxApp(language);
  };
  handleNavigate = () => {
    this.props.history.push("/home");
  };
  render() {
    const language = this.props.language;
    return (
      <Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fas fa-bars"></i>
              <div className="header-logo" onClick={this.handleNavigate}>
                <Logo />
              </div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                  <div className="sub-title">
                    <FormattedMessage id="homeheader.searchdoctor" />
                  </div>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                  <div className="sub-title">
                    <FormattedMessage id="homeheader.doctor" />
                  </div>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.select-doctor" />
                  </b>
                  <div className="sub-title">
                    <FormattedMessage id="homeheader.fee" />
                  </div>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.check-package" />
                  </b>
                  <div className="sub-title">
                    <FormattedMessage id="homeheader.check-health" />
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active "
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VI
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active "
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm chuyên khoa" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-hospital-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-flask"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="fas fa-brief-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageReduxApp: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
