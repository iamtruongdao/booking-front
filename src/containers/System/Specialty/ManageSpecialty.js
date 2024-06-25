import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import CommonUtils from "../../../utils/CommonUtils";
import MdEditor from "react-markdown-editor-lite";
import { postSpecialty } from "../../../services/specialtyService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHTML: "",
      descriptionMarkdown: "",
      image: "",
      name: "",
    };
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({ descriptionHTML: html, descriptionMarkdown: text });
  };
  handleOnchangeText = (e) => {
    this.setState({ name: e.target.value });
  };
  handleOnchangeFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      let imageBase64 = await CommonUtils.getBase64(file);
      this.setState({ image: imageBase64 });
    }
  };
  handleSave = async () => {
    console.log(this.state);
    const res = await postSpecialty({ ...this.state });
    if (res && res.errCode === 0) {
      toast.success("create specialty success");
    } else {
      toast.error("create specialty failed");
    }
  };
  render() {
    const { name, descriptionMarkdown } = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label htmlFor="">Thêm chuyên khoa</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={this.handleOnchangeText}
            />
          </div>
          <div className="col-6">
            <label htmlFor="">Ảnh chuyên khoa</label>
            <input
              type="file"
              className="form-control-file"
              onChange={this.handleOnchangeFile}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={descriptionMarkdown}
            />
          </div>
          <div className="btn-save-specialty col-12">
            <button onClick={this.handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
