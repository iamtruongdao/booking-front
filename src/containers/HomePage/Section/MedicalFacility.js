import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import "./Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services";
import { withRouter } from "react-router-dom";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrClinic: [],
    };
  }
  handleNavigateDetailClinic = (item) => {
    this.props.history.push(`detail-clinic/${item.id}`);
  };
  async componentDidMount() {
    const res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({ arrClinic: res.data });
    }
  }
  render() {
    const { arrClinic } = this.state;
    return (
      <div className="section-share medical-facility">
        <div className="section-content">
          <div className="section-header">
            <span className="title-section">Cơ sở ý tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrClinic &&
                arrClinic.length > 0 &&
                arrClinic.map((item) => (
                  <div
                    className="section-customize"
                    onClick={() => this.handleNavigateDetailClinic(item)}
                  >
                    <div
                      style={{ backgroundImage: `url(${item.image})` }}
                      className="bg-img section-medical-facility"
                    />
                    <div className="specialty-name">{item.name}</div>
                  </div>
                ))}
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
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
