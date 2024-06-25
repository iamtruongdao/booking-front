import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailClinic.scss";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "../Doctor/DocTorSchedule";
import DoctorExtrainfor from "../Doctor/DoctorExtrainfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getClinicById } from "../../../services";
import * as _ from "lodash";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      detailClinic: "",
    };
  }
  async componentDidMount() {
    console.log(this.props);
    const res = await getClinicById(this.props.match.params.id);
    if (res && res.errCode === 0) {
      const arrDoctor = res.data?.doctorClinic.map((item) => item.doctorId);
      this.setState({ detailClinic: res.data, arrDoctor });
    }
  }

  render() {
    const { arrDoctor, detailClinic } = this.state;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="specialty-detail-container">
          <div className="detail-specialty-body">
            <div className="description-specialty">
              <div>{detailClinic?.name}</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: detailClinic?.descriptionHTML,
                }}
              ></div>
            </div>
            {arrDoctor &&
              arrDoctor.length > 0 &&
              arrDoctor.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <ProfileDoctor
                        doctorId={item}
                        dateTime={{ date: new Date().getTime() }}
                        isShowDesc={true}
                        isShowPrice={false}
                        isShowDetail={true}
                      />
                    </div>
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorId={item} />
                      </div>
                      <div className="doctor-extra-infor">
                        <div className="doctor-extra-infor-container">
                          <DoctorExtrainfor doctorId={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
