import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES, manageActions } from "../../../utils";
import { getDoctorById } from "../../../services/index";
import * as _ from "lodash";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      selectedOption: "",
      hasOldData: "",
      //doctor infor table
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      listPrice: "",
      listProvince: "",
      listPayment: "",
      listClinic: "",
      listSpecialty: "",
    };
  }
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDoctorById(selectedOption.value);
    console.log(res);
    const { listPrice, listPayment, listProvince, listSpecialty, listClinic } =
      this.state;
    const Markdown = res.data.Markdown;
    console.log();
    let nameClinic = "",
      addressClinic = "",
      note = "",
      selectedPrice = "",
      selectedPayment = "",
      selectedProvince = "",
      selectedSpecialty = "",
      selectedClinic = "";
    console.log(_.isEmpty(_.omitBy(res.data.Doctor_infor, _.isNil)));
    if (res && res.errCode === 0 && !_.isEmpty(_.omitBy(Markdown, _.isNil))) {
      if (!_.isEmpty(_.omitBy(res.data.Doctor_infor, _.isNil))) {
        nameClinic = res.data.Doctor_infor.nameClinic;
        addressClinic = res.data.Doctor_infor.addressClinic;
        note = res.data.Doctor_infor.note;
        const priceId = res.data.Doctor_infor.priceId;
        const provinceId = res.data.Doctor_infor.provinceId;
        const paymentId = res.data.Doctor_infor.paymentId;
        const specialtyId = res.data.Doctor_infor.specialtyId;
        const clinicId = res.data.Doctor_infor.clinicId;
        selectedPrice = listPrice.find(
          (item) => item && item.value === priceId
        );
        selectedProvince = listProvince.find(
          (item) => item && item.value === provinceId
        );
        selectedPayment = listPayment.find(
          (item) => item && item.value === paymentId
        );
        selectedSpecialty = listSpecialty.find(
          (item) => item && item.value === specialtyId
        );
        selectedClinic = listClinic.find(
          (item) => item && item.value === clinicId
        );
        this.setState({
          contentHTML: Markdown.contentHTML,
          contentMarkdown: Markdown.contentMarkdown,
          description: Markdown.description,
          hasOldData: true,
          nameClinic,
          addressClinic,
          note,
          selectedProvince,
          selectedPrice,
          selectedPayment,
          selectedSpecialty,
          selectedClinic,
        });
      } else {
        this.setState({
          contentHTML: "",
          contentMarkdown: "",
          description: "",
          hasOldData: false,
          selectedPrice,
          note,
          nameClinic,
          addressClinic,
          selectedPayment,
          selectedProvince,
          selectedSpecialty,
          selectedClinic,
        });
      }
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        selectedPrice,
        note,
        nameClinic,
        addressClinic,
        selectedPayment,
        selectedProvince,
        selectedSpecialty,
        selectedClinic,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({ contentHTML: html, contentMarkdown: text });
  };
  handleOnchangeDes = (e) => {
    this.setState({ description: e.target.value });
  };
  handleSaveContent = () => {
    this.props.saveDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      id: this.state.selectedOption.value,
      action: this.state.hasOldData ? manageActions.EDIT : manageActions.CREATE,
      priceId: this.state.selectedPrice.value,
      paymentId: this.state.selectedPayment.value,
      provinceId: this.state.selectedProvince.value,
      clinicId: this.state?.selectedClinic?.value || -1,
      specialtyId: this.state.selectedSpecialty.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      selectedOption: "",
      selectedPrice: "",
      hasOldData: false,
      selectedProvince: "",
      selectedPayment: "",
      selectedSpecialty: "",
      selectedClinic: "",
      priceId: "",
      paymentId: "",
      provinceId: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    });
  };
  buildOptions = (inputData, type) => {
    const { language } = this.props;
    let option = [];
    if (inputData && inputData.length > 0) {
      option = inputData.map((item) => {
        const obj = {};
        if (type === "USERS") {
          const valueVi = item.lastName + " " + item.firstName;
          const valueEn = item.firstName + " " + item.lastName;
          obj.value = item.id;
          obj.label = language === LANGUAGES.VI ? valueVi : valueEn;
        }
        if (type === "PAYMENT") {
          obj.value = item.keyMap;
          obj.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
        }
        if (type === "PROVINCE" || type === "PRICE") {
          obj.value = item.keyMap;
          obj.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
        }
        if (type === "SPECIALTY" || type === "CLINIC") {
          obj.value = item.id;
          obj.label = item.name;
        }
        return obj;
      });
    }
    return option;
  };
  handleChangeDoctorInfor = (selectedOption, name) => {
    let copyState = { ...this.state };
    const stateName = name.name;
    copyState[stateName] = selectedOption;
    this.setState({ ...copyState }, () => {
      console.log(this.state);
    });
  };
  handleChangeText = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };
  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.getDoctorInforRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.listDoctors !== this.props.listDoctors) {
      let data = this.buildOptions(this.props.listDoctors, "USERS");
      this.setState({ listDoctors: data });
    }
    if (prevProps.language !== this.props.language) {
      let data = this.buildOptions(this.props.listDoctors, "USERS");
      const { resPrice, resProvince, resPayment, resSpecialty, resClinic } =
        this.props.listDoctorsInfor;
      let listPrice = this.buildOptions(resPrice, "PRICE");
      let listProvince = this.buildOptions(resProvince, "PROVINCE");
      let listPayment = this.buildOptions(resPayment, "PAYMENT");
      let listSpecialty = this.buildOptions(resSpecialty, "SPECIALTY");
      let listClinic = this.buildOptions(resClinic, "CLINIC");
      this.setState({
        listDoctors: data,
        listPayment,
        listPrice,
        listProvince,
        listSpecialty,
        listClinic,
      });
    }
    if (prevProps.listDoctorsInfor !== this.props.listDoctorsInfor) {
      const { resPrice, resProvince, resPayment, resSpecialty, resClinic } =
        this.props.listDoctorsInfor;
      let listPrice = this.buildOptions(resPrice, "PRICE");
      let listProvince = this.buildOptions(resProvince, "PROVINCE");
      let listPayment = this.buildOptions(resPayment, "PAYMENT");
      let listSpecialty = this.buildOptions(resSpecialty, "SPECIALTY");
      let listClinic = this.buildOptions(resClinic, "CLINIC");

      this.setState({
        listPrice,
        listPayment,
        listProvince,
        listSpecialty,
        listClinic,
      });
    }
  }

  render() {
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              value={this.state.description}
              onChange={this.handleOnchangeDes}
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeDoctorInfor}
              options={this.state.listPrice}
              name="selectedPrice"
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeDoctorInfor}
              options={this.state.listPayment}
              name="selectedPayment"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeDoctorInfor}
              options={this.state.listProvince}
              name="selectedProvince"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleChangeText(e, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleChangeText(e, "addressClinic")}
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.note}
              onChange={(e) => this.handleChangeText(e, "note")}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.select-clinic" />
            </label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeDoctorInfor}
              options={this.state.listClinic}
              name="selectedClinic"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeDoctorInfor}
              options={this.state.listSpecialty}
              name="selectedSpecialty"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.specialty" />
              }
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={this.handleSaveContent}
        >
          {!this.state.hasOldData ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctors: state.admin.listDoctors,
    language: state.app.language,
    listDoctorsInfor: state.admin.listDoctorsInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStartRedux: () => dispatch(actions.getAllUserStart()),
    deleteUserStartRedux: (id) => dispatch(actions.deleteUserStart(id)),
    getAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    saveDoctorRedux: (data) => dispatch(actions.saveDetailDoctorStart(data)),
    getDoctorInforRedux: () => dispatch(actions.getAllDoctorInforStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
