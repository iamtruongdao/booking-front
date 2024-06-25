import React, { Component } from "react";
import { getDoctorById } from "../../../services/doctorService";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { LANGUAGES } from "../../../utils";
import DocTorSchedule from "./DocTorSchedule";
import DoctorExtrainfor from "./DoctorExtrainfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let res = await getDoctorById(this.props.match.params.id);
      if (res && res.errCode === 0) {
        this.setState({ detailDoctor: res.data });
      }
    }
  }
  render() {
    const { detailDoctor } = this.state;
    const { language } = this.props;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor?.positionData?.valueVI}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor?.positionData?.valueEN}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{ backgroundImage: `url(${detailDoctor.image})` }}
            ></div>
            <div className="content-right">
              <div className="up">
                {LANGUAGES.VI === language ? nameVi : nameEn}
              </div>
              <div className="down">{detailDoctor?.Markdown?.description}</div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DocTorSchedule doctorId={this.props.match.params.id || -1} />
            </div>
            <div className="content-right">
              <DoctorExtrainfor doctorId={this.props.match.params.id || -1} />
            </div>
          </div>
          <div
            className="detail-info-doctor"
            dangerouslySetInnerHTML={{
              __html: detailDoctor?.Markdown?.contentHTML,
            }}
          ></div>
          <div className="comment-doctor"></div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
