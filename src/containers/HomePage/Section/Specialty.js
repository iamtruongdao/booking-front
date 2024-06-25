import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import "./Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getSpecialty } from "../../../services/specialtyService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty: "",
    };
  }
  async componentDidMount() {
    const res = await getSpecialty();
    if (res && res.errCode === 0) {
      this.setState({ specialty: res.data });
    }
  }
  handleNavigateDetailSpecialty = (item) => {
    this.props.history.push(`detail-specialty/${item.id}`);
  };
  render() {
    const { specialty } = this.state;
    return (
      <div className="section-share section-specialty">
        <div className="section-content">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.popular-speciality" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {specialty &&
                specialty.length > 0 &&
                specialty.map((item) => {
                  return (
                    <div
                      className="section-customize"
                      onClick={() => this.handleNavigateDetailSpecialty(item)}
                    >
                      <div
                        className="bg-img section-specialty specialty-child"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="specialty-name">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
