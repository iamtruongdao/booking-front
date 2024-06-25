import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { getScheduleByDoctorId } from "../../../services/doctorService";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggle: false,
      arrDate: [],
      dataBooking: {},
    };
  }
  async componentDidMount() {
    const { language, doctorId } = this.props;
    const arrDate = this.getArrDate(language);
    this.setState({ arrDate });
    if (doctorId !== -1) {
      const res = await getScheduleByDoctorId(doctorId, arrDate[0].value);
      if (res && res.errCode === 0) {
        this.setState({ arrSchedule: res.data });
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      const arrDate = this.getArrDate(this.props.language);
      this.setState({ arrDate });
    }
  }
  getArrDate = (language) => {
    const arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          const ddMM = moment(new Date()).format("DD/MM");
          object.label = `Hôm nay - ${ddMM}`;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
        }
      } else {
        if (i === 0) {
          const ddMM = moment(new Date()).format("DD/MM");
          object.label = `Today - ${ddMM}`;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    return arrDate;
  };
  handleGetSchedule = async (e) => {
    if (this.props.doctorId !== -1) {
      const res = await getScheduleByDoctorId(
        this.props.doctorId,
        e.target.value
      );
      if (res && res.errCode === 0) {
        this.setState({ arrSchedule: res.data });
      }
    }
  };
  handleBook = (date) => {
    this.setState({ isToggle: true, dataBooking: date }, () => {
      console.log(this.state);
    });
  };
  handleCloseModal = () => {
    this.setState({ isToggle: false });
  };
  render() {
    const { arrDate, arrSchedule, dataBooking } = this.state;
    const { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handleGetSchedule(e)}>
              {arrDate &&
                arrDate.length > 0 &&
                arrDate.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="all-avaiable-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {arrSchedule && arrSchedule.length > 0 ? (
                <>
                  <div className="time-content-btn">
                    {arrSchedule.map((item, index) => {
                      const value =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVI
                          : item.timeTypeData.valueEN;
                      return (
                        <button
                          onClick={() => this.handleBook(item)}
                          className={
                            language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                          }
                          key={index}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.detail-doctor.book" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          doctorId={this.props.doctorId}
          isToggle={this.state.isToggle}
          handleCloseModal={this.handleCloseModal}
          dateTime={dataBooking}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
