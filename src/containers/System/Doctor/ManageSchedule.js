import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import * as _ from "lodash";
import { toast } from "react-toastify";
import { saveScheduleDoctor } from "../../../services/doctorService";
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      listDoctors: "",
      currentDate: new Date(),
      rangeSchedule: "",
    };
  }
  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.getAllScheduleRedux();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.listDoctors !== this.props.listDoctors ||
      prevProps.language !== this.props.language
    ) {
      let selectedArray = this.buildOptions(this.props.listDoctors);
      this.setState({ listDoctors: selectedArray });
    }
    if (prevProps.listSchedule !== this.props.listSchedule) {
      this.props.listSchedule.forEach((element) => {
        element.isSelected = false;
      });
      this.setState({ rangeSchedule: this.props.listSchedule });
    }
  }
  buildOptions = (inputData) => {
    let option = [];
    if (inputData && inputData.length > 0) {
      option = inputData.map((item) => ({
        value: item.id,
        label:
          LANGUAGES.VI === this.props.language
            ? item.lastName + " " + item.firstName
            : item.firstName + " " + item.lastName,
      }));
    }
    return option;
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  handleChangeDate = ([date]) => {
    this.setState({ currentDate: date });
    console.log(date);
  };
  handleClickSchedule = (time) => {
    const { rangeSchedule } = this.state;
    rangeSchedule &&
      rangeSchedule.length > 0 &&
      rangeSchedule.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
    this.setState({ rangeSchedule });
  };
  handleSave = async () => {
    const { rangeSchedule, selectedOption, currentDate } = this.state;
    if (!currentDate) {
      toast.error("invalid date!");
      return;
    }
    if (_.isEmpty(selectedOption)) {
      toast.error("invalid doctor!");
      return;
    }
    let formattedDate = new Date(currentDate).getTime();
    if (rangeSchedule && rangeSchedule.length > 0) {
      const arrSchedule = rangeSchedule.filter((item) => item.isSelected);

      const result = arrSchedule.map((schedule) => ({
        date: formattedDate,
        doctorId: selectedOption.value,
        timeType: schedule.keyMap,
      }));
      const res = await saveScheduleDoctor({
        arrSchedule: result,
        doctorId: selectedOption.value,
        formattedDate,
      });
      if (res && res.errCode === 0) {
        toast.success("create schedule success");
      } else {
        toast.error("create schedule failed");
      }
      console.log(result);
    } else {
      toast.error("invalid rangeSchedule");
      return;
    }
  };
  render() {
    const { currentDate, rangeSchedule } = this.state;
    const { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleChangeDate}
                className="form-control"
                minDate={new Date().setHours(0, 0, 0, 0)}
                value={currentDate}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeSchedule &&
                rangeSchedule.length > 0 &&
                rangeSchedule.map((item) => (
                  <button
                    onClick={() => this.handleClickSchedule(item)}
                    className={`btn btn-schedule ${
                      item.isSelected ? "active" : ""
                    }`}
                  >
                    {LANGUAGES.VI === language ? item.valueVI : item.valueEN}
                  </button>
                ))}
            </div>
            <div className="col-12">
              <button
                onClick={this.handleSave}
                className="btn btn-primary btn-save-schedule"
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDoctors: state.admin.listDoctors,
    listSchedule: state.admin.listSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    getAllScheduleRedux: () => dispatch(actions.getAllScheduleDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
