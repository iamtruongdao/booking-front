import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import { getListPatientForDoctorId } from "../../../services";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import { postRemedy } from "../../../services";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isShowRemedyModal: false,
      isShowLoading: false,
      dataModal: {},
    };
  }
  async componentDidMount() {
    const { currentDate } = this.state;
    await this.getDataPatient(currentDate);
  }
  getDataPatient = async () => {
    const res = await getListPatientForDoctorId(
      this.props.userInfo.id,
      new Date(this.state.currentDate).getTime()
    );
    if (res && res.errCode === 0) {
      this.setState({ dataPatient: res.data });
    }
  };
  handleChangeDate = async ([date]) => {
    this.setState({ currentDate: date }, async () => {
      await this.getDataPatient();
    });
  };
  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
      language: this.props.language,
    };
    this.setState({ isShowRemedyModal: true, dataModal: data });
  };
  closeRemedyModal = () => {
    this.setState({ isShowRemedyModal: false });
  };
  sendRemedy = async (data) => {
    this.setState({ isShowLoading: true });
    const res = await postRemedy({
      ...data,
      ...this.state.dataModal,
    });
    if (res && res.errCode === 0) {
      toast.success("success");
      this.setState({ isShowLoading: false, isShowRemedyModal: false });

      await this.getDataPatient();
    } else {
      toast.error("failed");
      this.setState({ isShowLoading: true });
    }
  };
  render() {
    const { dataPatient, isShowRemedyModal, dataModal, isShowLoading } =
      this.state;
    const { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={isShowLoading}
          spinner
          text="Loading your content..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý khám chữa bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label htmlFor="">Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleChangeDate}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12">
                <table border="1" className="table-manage-patient">
                  <tr>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Thời gian</th>
                    <th>Địa chỉ</th>
                    <th>Giới tính</th>
                    <th>Actions</th>
                  </tr>
                  {dataPatient &&
                    dataPatient.length > 0 &&
                    dataPatient.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.patientData.firstName}</td>
                        <td>
                          {language === LANGUAGES.VI
                            ? item?.patientDoctorData?.valueVI
                            : item?.patientDoctorData?.valueEN}
                        </td>
                        <td>{item?.patientData?.address}</td>

                        <td>{item?.patientData?.gender}</td>
                        <td>
                          <button
                            onClick={() => this.handleConfirm(item)}
                            className="mp-btn-confirm"
                          >
                            Xác nhận
                          </button>
                        </td>
                      </tr>
                    ))}
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isShowRemedyModal={isShowRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
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
