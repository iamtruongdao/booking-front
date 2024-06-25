import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";

import moment from "moment";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      image: "",
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({ email: this.props.dataModal.email });
    }
  }
  handleOnchange = (e) => {
    this.setState({ email: e.target.value });
  };
  handleOnchangeImg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        image: await CommonUtils.getBase64(file),
      });
    }
  };
  handleConfirm = async () => {
    await this.props.sendRemedy(this.state);
  };
  render() {
    const { isShowRemedyModal, closeRemedyModal } = this.props;
    const { email } = this.state;

    return (
      <Modal
        isOpen={isShowRemedyModal}
        size="lg"
        className="booking-modal-container"
        centered
      >
        <ModalHeader toggle={closeRemedyModal}>
          Gửi hóa đơn khám bệnh
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label htmlFor="">Email bệnh nhân</label>
              <input
                className="form-control"
                type="email"
                onChange={this.handleOnchange}
                value={email}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">Hình ảnh</label>
              <input
                className="form-control-file"
                onChange={this.handleOnchangeImg}
                type="file"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleConfirm}>
            Save
          </Button>
          <Button color="secondary" onClick={closeRemedyModal}>
            Cancel
          </Button>
        </ModalFooter>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
