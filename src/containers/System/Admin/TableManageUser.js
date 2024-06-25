import React, { Component, Fragment } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: [],
    };
  }
  componentDidMount() {
    this.props.getAllUserStartRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({ listUsers: this.props.listUsers });
    }
  }
  handleDelete = (id) => {
    this.props.deleteUserStartRedux(id);
  };
  handleEdit = (user) => {
    this.props.handleEditUserFromParents(user);
  };
  render() {
    const { listUsers } = this.state;
    return (
      <Fragment>
        <div className="user-container">
          <div>
            <table id="table-manage-user">
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item, index) => (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.gender}</td>
                    <td>{item.roleId}</td>
                    <td>{item.positionId}</td>
                    <tr>
                      <td>
                        <button onClick={() => this.handleEdit(item)}>
                          edit
                        </button>
                        <button onClick={() => this.handleDelete(item.id)}>
                          delete
                        </button>
                      </td>
                    </tr>
                  </tr>
                ))}
            </table>
          </div>
        </div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.listUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStartRedux: () => dispatch(actions.getAllUserStart()),
    deleteUserStartRedux: (id) => dispatch(actions.deleteUserStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
