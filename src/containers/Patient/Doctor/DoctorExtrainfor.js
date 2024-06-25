import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";

import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../../utils";
import { getExtraInforByDoctorId } from "../../../services/doctorService";

class DoctorExtrainfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowInfor: false,
      extraDoctor: "",
    };
  }
  async componentDidMount() {
    const res = await getExtraInforByDoctorId(this.props.doctorId);
    if (res && res.errCode === 0) {
      this.setState({ extraDoctor: res.data });
    }
  }
  handleSetShow = (status) => {
    this.setState({ isShowInfor: status });
  };
  render() {
    const { isShowInfor, extraDoctor } = this.state;
    const { language } = this.props;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </div>
          <div className="name-clinic">{extraDoctor?.nameClinic}</div>
          <div className="detail-address">{extraDoctor?.addressClinic}</div>
        </div>
        <div className="content-down">
          {!isShowInfor && (
            <div className="short-infor">
              <FormattedMessage id="patient.extra-infor-doctor.price" /> :
              {language === LANGUAGES.VI ? (
                <NumberFormat
                  className="currency"
                  value={extraDoctor?.priceTypeData?.valueVI}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              ) : (
                <NumberFormat
                  className="currency"
                  value={extraDoctor?.priceTypeData?.valueEN}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                />
              )}
              <span onClick={() => this.handleSetShow(true)}>
                <FormattedMessage id="patient.extra-infor-doctor.detail" />
              </span>
            </div>
          )}
          {isShowInfor && (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-infor-doctor.price" /> .
              </div>
              <div className="detail-infor">
                <div className="price">
                  <div className="left">
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                  </div>
                  <div className="right">
                    {language === LANGUAGES.VI ? (
                      <NumberFormat
                        className="currency"
                        value={extraDoctor?.priceTypeData?.valueVI}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    ) : (
                      <NumberFormat
                        className="currency"
                        value={extraDoctor?.priceTypeData?.valueEN}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    )}
                  </div>
                </div>
                <div className="note">{extraDoctor?.note}</div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                {language === LANGUAGES.VI
                  ? extraDoctor?.paymentTypeData?.valueVI
                  : extraDoctor?.paymentTypeData?.valueEN}
              </div>

              <div className="hide-price">
                <span onClick={() => this.handleSetShow(false)}>
                  <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                </span>
              </div>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
