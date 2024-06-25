import React, { Component } from "react";

import { connect } from "react-redux";
import "./VerifyEmail.scss";

import { verifyEmail } from "../../../services/bookingService";
import HomeHeader from "../../HomePage/HomeHeader";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    const urlParam = new URLSearchParams(this.props.location.search);
    const token = urlParam.get("token");
    const doctorId = urlParam.get("doctorId");
    const res = await verifyEmail({ token, doctorId });
    if (res && res.errCode === 0) {
      this.setState({ isSuccess: true, errCode: res.errCode });
    } else {
      this.setState({ isSuccess: true, errCode: res.errCode ? " " : -1 });
    }
  }

  render() {
    const { isSuccess, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        {!isSuccess ? (
          <div>...Loading</div>
        ) : (
          <div className="verify-email">
            {errCode === 0 ? (
              <div className="infor-booking">Xác nhận lịch hẹn thành công</div>
            ) : (
              <div className="infor-booking">
                Không tồn tại lịch hẹn hoặc đã được xác nhận
              </div>
            )}
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
