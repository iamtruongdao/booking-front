import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import "./Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = { topDoctors: [] };
  }
  componentDidMount() {
    this.props.fetchTopDocTorRedux(5);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({ topDoctors: this.props.topDoctors }, () => {
        console.log(this.state);
      });
    }
  }
  handleNavigateDetailDoctor = (item) => {
    this.props.history.push(`detail-doctor/${item.id}`);
  };
  render() {
    let topDoctors = this.state.topDoctors;
    // topDoctors = topDoctors.concat(topDoctors).concat(topDoctors);
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-content">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {topDoctors &&
                topDoctors.length > 0 &&
                topDoctors.map((item, index) => {
                  let imageBuffer = "";
                  if (item.image) {
                    imageBuffer = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVI}, ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEN}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="section-customize"
                      onClick={() => this.handleNavigateDetailDoctor(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-img section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBuffer})` }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>
                            {this.props.language === LANGUAGES.VI
                              ? nameVi
                              : nameEn}
                          </div>
                          <div>Cơ xương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDocTorRedux: (limit) => dispatch(actions.fetchTopDoctor(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
