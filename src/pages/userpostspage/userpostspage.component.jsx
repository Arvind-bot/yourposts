import React from "react";
import { connect } from "react-redux";
import "./userpostspage.styles.scss";
import {
  setCurrentUserPosts,
  setPostsTableHeader,
  setPostsTableRows,
} from "../../redux/user/user.action";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Link,
  TableToolbar,
  TableToolbarAction,
  TableToolbarSearch,
  TableToolbarContent,
  TableToolbarMenu,
  TableBatchActions,
  TableBatchAction,
  TableContainer,
  Button,
  TableSelectAll,
  TableSelectRow,
} from "carbon-components-react";

import { ReactComponent as Delete } from "./trash-can.svg";
import ModalStateManager from "../../components/modal/modal.component";

class UserPostsPage extends React.Component {
  componentDidMount() {
    const {
      setCurrentUserPosts,
      setPostsTableHeader,
      setPostsTableRows,
    } = this.props;
    const BASE_URL = "https://dummyapi.io/data/api";
    const APP_ID = "5fa4f09c8a129ee167647e57";
    const USER_ID = "" + this.props.currentUser.id;
    fetch(`${BASE_URL}/user/${USER_ID}/post`, {
      headers: { "app-id": APP_ID },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setCurrentUserPosts(data);
        const headers = [
          {
            key: "postId",
            header: "Post ID",
          },
          {
            key: "imageLink",
            header: "Image Link",
          },
          {
            key: "caption",
            header: "Caption",
          },
          {
            key: "likes",
            header: "Likes",
          },
        ];
        setPostsTableHeader(headers);
        const rows = data.map(({ id, image, publishDate, text, likes }) => ({
          id: id,
          postId: id,
          imageLink: image,
          caption: text,
          likes: likes,
        }));
        setPostsTableRows(rows);
        //   console.log(rows);
        //   console.log(header);
      });
  }

  batchActionClick = (selectedRows) => {
    const { setPostsTableRows, rows } = this.props;
    const filteredPosts = rows.filter(
      (row) => !selectedRows.some((selectedRow) => row.id === selectedRow.id)
    );
    setPostsTableRows(filteredPosts);
  };

  render() {
    const { rows, headers } = this.props;
    return (
      <div className="userpostpage">
        <div className="data-table">
          {rows ? (
            headers ? (
              <DataTable  rows={rows} headers={headers}>
                {({
                  rows,
                  headers,
                  getHeaderProps,
                  getRowProps,
                  getSelectionProps,
                  getToolbarProps,
                  getBatchActionProps,
                  onInputChange,
                  selectedRows,
                  getTableProps,
                  getTableContainerProps,
                }) => (
                  <TableContainer
                    title="User posts"
                    description=""
                    {...getTableContainerProps()}
                  >
                    <TableToolbar>
                      <TableBatchActions {...getBatchActionProps()}>
                        <TableBatchAction
                          tabIndex={
                            getBatchActionProps().shouldShowBatchActions
                              ? 0
                              : -1
                          }
                          renderIcon={Delete}
                          onClick={() => this.batchActionClick(selectedRows)}
                        >
                          Delete
                        </TableBatchAction>
                        {/* <Button onClick={()=>this.batchActionClick(selectedRows)}>Delete</Button> */}
                      </TableBatchActions>

                      <TableToolbarContent>
                        {/* pass in `onInputChange` change here to make filtering work */}
                        <TableToolbarSearch onChange={onInputChange} />
                        
                        <Button>Add Row</Button>
                      </TableToolbarContent>
                    </TableToolbar>

                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          <TableSelectAll {...getSelectionProps()} />
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow {...getRowProps({ row })}>
                            <TableSelectRow {...getSelectionProps({ row })} />
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>
                                {cell.info.header === "imageLink" ? (
                                  <Link className="row-link" href={cell.value}>
                                    {cell.value}
                                  </Link>
                                ) : (
                                  cell.value
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            ) : null
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  user: { currentUser, userPosts, headers, rows },
}) => ({
  currentUser,
  userPosts,
  headers,
  rows,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserPosts: (userPosts) => dispatch(setCurrentUserPosts(userPosts)),
  setPostsTableHeader: (header) => dispatch(setPostsTableHeader(header)),
  setPostsTableRows: (rows) => dispatch(setPostsTableRows(rows)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPostsPage);
