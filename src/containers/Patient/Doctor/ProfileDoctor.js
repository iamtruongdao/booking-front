import React, { Component } from "react";
import { getProfileByDoctorId } from "../../../services/doctorService";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

import moment from "moment";
import { Link } from "react-router-dom";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    const { doctorId } = this.props;
    await this.getDoctorId(doctorId);
  }

  getDoctorId = async (id) => {
    const res = await getProfileByDoctorId(id);
    if (res && res.errCode === 0) {
      this.setState({ detailDoctor: res.data });
    }
  };
  renderTime = (dateTime) => {
    const { language } = this.props;
    console.log(dateTime);
    let date =
      language === LANGUAGES.VI
        ? moment.unix(dateTime?.date / 1000).format("dddd - DD/MM/YYYY")
        : moment
            .unix(dateTime?.date / 1000)
            .locale("en")
            .format("dddd - DD/MM/YYYY");
    let time =
      language === LANGUAGES.VI
        ? dateTime?.timeTypeData?.valueVI
        : dateTime?.timeTypeData?.valueEN;
    return (
      <>
        <div>
          ${time} - ${date}
        </div>
        <div>
          <FormattedMessage id="patient.booking-modal.priceBooking" />
        </div>
      </>
    );
  };
  render() {
    const { detailDoctor } = this.state;
    const {
      language,
      isShowDesc,
      dateTime,
      isShowPrice,
      isShowDetail,
      doctorId,
    } = this.props;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor?.positionData?.valueVI}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor?.positionData?.valueEN}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <div className="profile-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${detailDoctor.image})` }}
          ></div>
          <div className="content-right">
            <div className="up">
              {LANGUAGES.VI === language ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDesc
                ? detailDoctor?.Markdown?.description
                : this.renderTime(dateTime)}
            </div>
          </div>
        </div>
        {isShowPrice && (
          <div className="price">
            <FormattedMessage id="patient.extra-infor-doctor.price" /> :
            {language === LANGUAGES.VI ? (
              <NumberFormat
                className="currency"
                value={detailDoctor?.Doctor_infor?.priceTypeData?.valueVI}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"VND"}
              />
            ) : (
              <NumberFormat
                className="currency"
                value={detailDoctor?.Doctor_infor?.priceTypeData?.valueEN}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
              />
            )}
          </div>
        )}
        {isShowDetail && (
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
