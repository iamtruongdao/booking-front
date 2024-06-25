import React, { Component } from "react";

import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "../Doctor/DocTorSchedule";
import DoctorExtrainfor from "../Doctor/DoctorExtrainfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getSpecialtyById, getAllcodeService } from "../../../services";
import * as _ from "lodash";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      arrProvince: [],
      detailSpecialty: "",
    };
  }
  async componentDidMount() {
    console.log(this.props);
    const res = await getSpecialtyById(this.props.match.params.id, "ALL");
    if (res && res.errCode === 0) {
      const arrDoctor = res.data?.doctorSpecialty.map((item) => item.doctorId);
      this.setState({ detailSpecialty: res.data, arrDoctor });
    }
    const resProvince = await getAllcodeService("province");
    if (resProvince && resProvince.errCode === 0) {
      resProvince?.data.unshift({
        createdAt: null,
        keyMap: "ALL",
        valueVI: "Toàn Quốc",
        valueEN: "ALL",
        type: "PROVINCE",
      });
      this.setState({ arrProvince: resProvince.data });
    }
  }
  handleOnchangeSelect = async (e) => {
    const id = this.props.match.params.id;
    const location = e.target.value;
    const res = await getSpecialtyById(id, location);
    console.log(res);
    if (res && res.errCode === 0) {
      let data = res.data;
      if (data && !_.isEmpty(data)) {
        console.log("hehe");
        const arrDoctor =
          data.doctorSpecialty &&
          data.doctorSpecialty.length > 0 &&
          data.doctorSpecialty.map((item) => item.doctorId);
        this.setState({ arrDoctor });
      }
    }
  };
  render() {
    const { arrDoctor, detailSpecialty, arrProvince } = this.state;
    const { language } = this.props;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="specialty-detail-container">
          <div className="detail-specialty-body">
            <div
              className="description-specialty"
              dangerouslySetInnerHTML={{
                __html: detailSpecialty?.descriptionHTML,
              }}
            ></div>
            <div className="search-sp-doctor">
              <select name="" id="" onChange={this.handleOnchangeSelect}>
                {arrProvince &&
                  arrProvince.length > 0 &&
                  arrProvince.map((item, index) => (
                    <option value={item.keyMap} key={index}>
                      {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                    </option>
                  ))}
              </select>
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
                          <DoctorExtrainfor doctorId={item} />{" "}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
