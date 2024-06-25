import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../../utils";
import ProfileDoctor from "../ProfileDoctor";
import Select from "react-select";
import * as action from "../../../../store/actions/index";
import DatePicker from "../../../../components/Input/DatePicker";
import { postBookingAppointment } from "../../../../services/index";
import { toast } from "react-toastify";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDesc: false,
      selectedGender: "",
      genders: "",
      date: "",
      fullname: "",
      reason: "",
      address: "",
      email: "",
      phonenumber: "",
    };
  }
  componentDidMount() {
    this.props.fetchGenderRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.genders !== this.props.genders) {
      let genders = this.buildOptions(this.props.genders);
      this.setState({ genders });
    }
    if (prevProps.language !== this.props.language) {
      let genders = this.buildOptions(this.props.genders);
      this.setState({ genders });
    }
  }
  handleChangeGender = (selectedGender) => {
    this.setState({ selectedGender });
  };
  buildOptions = (inputData) => {
    const { language } = this.props;
    let option = [];
    if (inputData && inputData.length > 0) {
      option = inputData.map((item) => {
        const obj = {};
        obj.value = item.keyMap;
        obj.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
        return obj;
      });
    }

    return option;
  };
  handleChangeDate = ([date]) => {
    this.setState({ date });
  };
  handleChangeText = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };
  handleConfirm = async () => {
    let timeString = this.bullTimeString();
    let doctorName = this.buildDoctorName();
    const res = await postBookingAppointment({
      fullname: this.state.fullname,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      phonenumber: this.state.phonenumber,
      date: this.props.dateTime.date,
      doctorId: this.props.doctorId,
      gender: this.state.selectedGender.value,
      timeType: this.props.dateTime.timeType,
      language: this.props.language,
      timeString,
      doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("booking success");
    } else {
      toast.error("booking failed");
    }
  };
  bullTimeString = () => {
    const { language, dateTime } = this.props;
    let date =
      language === LANGUAGES.VI
        ? moment.unix(dateTime.date / 1000).format("dddd - DD/MM/YY")
        : moment
            .unix(dateTime.date / 1000)
            .locale("en")
            .format("dddd - DD/MM/YY");
    let time =
      language === LANGUAGES.VI
        ? dateTime.timeTypeData.valueVI
        : dateTime.timeTypeData.valueEN;
    return `${time} - ${date}`;
  };
  buildDoctorName = () => {
    const { language, dateTime } = this.props;
    const { lastName, firstName } = dateTime?.doctorData;
    let name =
      language === LANGUAGES.VI
        ? `${lastName} ${firstName}`
        : `${firstName} ${lastName}`;

    return name;
  };
  render() {
    const { isToggle, handleCloseModal, doctorId, dateTime } = this.props;
    const { genders } = this.state;

    return (
      <Modal
        isOpen={isToggle}
        size="lg"
        className="booking-modal-container"
        centered
      >
        <div className="booking-modal-content">
          <div className="modal-content-header">
            <span
              className="left
            "
            >
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span
              className="right
            "
            >
              <i onClick={handleCloseModal} className="fas fa-times"></i>
            </span>
          </div>
          <div className="modal-content-body">
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDesc={this.state.isShowDesc}
                dateTime={dateTime}
              />
            </div>
            <div className="price"></div>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.fullname" />
                </label>
                <input
                  type="text"
                  onChange={(e) => this.handleChangeText(e, "fullname")}
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  type="text"
                  onChange={(e) => this.handleChangeText(e, "address")}
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.phonenumber" />
                </label>
                <input
                  type="text"
                  onChange={(e) => this.handleChangeText(e, "phonenumber")}
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  type="text"
                  onChange={(e) => this.handleChangeText(e, "email")}
                  className="form-control"
                />
              </div>
              <div className="col-12 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  type="text"
                  onChange={(e) => this.handleChangeText(e, "reason")}
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  onChange={this.handleChangeDate}
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeGender}
                  options={genders}
                  name="selectedPrice"
                />
              </div>
            </div>
          </div>
          <div className="modal-content-footer">
            <button
              onClick={this.handleConfirm}
              className="btn-booking-confirm"
            >
              <FormattedMessage id="patient.booking-modal.btnConfirm" />
            </button>
            <button onClick={handleCloseModal} className="btn-booking-cancel">
              <FormattedMessage id="patient.booking-modal.btnCancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderRedux: () => dispatch(action.fetGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
