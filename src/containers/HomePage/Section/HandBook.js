import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import "./Specialty.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-content">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-img section-handbook" />
                <div>Hệ thống y tế Thu cúc 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-handbook" />
                <div>Hệ thống y tế Thu cúc 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-handbook" />
                <div>Hệ thống y tế Thu cúc 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-handbook" />
                <div>Hệ thống y tế Thu cúc 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-handbook" />
                <div>Hệ thống y tế Thu cúc 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-handbook" />
                <div>Hệ thống y tế Thu cúc 1</div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
