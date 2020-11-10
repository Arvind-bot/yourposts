import { Form } from "carbon-components-react";
import React from "react";
import ReactDOM from "react-dom";
import "./modal.styles.scss";
import { setPostsTableRows } from "../../redux/user/user.action";

// import { ComposedModal,ModalHeader,ModalBody } from "../composed-modal/composed-modal.component";
import {
  Button,
  TextInput,
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextArea,
} from "carbon-components-react";
import { connect } from "react-redux";

class ModalStateManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      postId: "",
      imageLink: "",
      caption: "",
    };
  }

  // const [open, setOpen] = useState(false);

  setOpen = (setValue) => {
    this.setState({ open: setValue });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { postId, imageLink, caption } = this.state;
    const { setPostsTableRows, rows } = this.props;
    console.log(rows);
    const row = {
      id: postId,
      postId: postId,
      imageLink: imageLink,
      caption: caption,
      likes: 0,
    };
    console.log(rows);
    setPostsTableRows([...rows, row]);
    this.setOpen(false);
  };

  render() {
    const { postId, imageLink, caption } = this.state;
    return (
      <>
        {typeof document === "undefined"
          ? null
          : ReactDOM.createPortal(
              <ComposedModal
                open={this.state.open}
                onClose={() => this.setOpen(false)}
              >
                <ModalHeader>Enter Post Details</ModalHeader>
                <ModalBody>
                  <div className="post-inputs">
                    <TextInput
                      id="postID"
                      type="text"
                      helperText=""
                      labelText="Unique Post Id"
                      placeholder="Enter Post ID"
                      name="postId"
                      value={postId}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="post-inputs">
                    <TextInput
                      id="imageLink"
                      type="text"
                      helperText=""
                      labelText="Image Link"
                      placeholder="Enter Image Link"
                      name="imageLink"
                      value={imageLink}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="post-inputs">
                    <TextArea
                      id="caption"
                      type="text"
                      helperText=""
                      labelText="Caption"
                      placeholder="Enter Post Caption"
                      name="caption"
                      value={caption}
                      onChange={this.handleChange}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button kind="primary" onClick={this.handleClick}>
                    Add
                  </Button>
                </ModalFooter>
              </ComposedModal>,
              document.body
            )}
        <Button kind="primary" onClick={() => this.setOpen(true)}>
          Add Row
        </Button>
      </>
    );
  }
}

const mapStateToProps = ({ user: { rows } }) => ({
  rows,
});

const mapDispatchToProps = (dispatch) => ({
  setPostsTableRows: (rows) => dispatch(setPostsTableRows(rows)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalStateManager);
