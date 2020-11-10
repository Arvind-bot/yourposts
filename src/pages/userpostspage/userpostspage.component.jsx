import React from "react";
import { connect } from "react-redux";
import "./userpostspage.styles.scss";
import { setCurrentUserPosts } from "../../redux/userPosts/userPosts.actions";
import { setPostsTableHeader } from "../../redux/dataTableHeader/dataTableHeader.actions";
import { setPostsTableRows } from "../../redux/dataTableRows/dataTableRows.actions";


import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarSearch,
  TableToolbarContent,
  TableBatchActions,
  TableBatchAction,
  TableContainer,
  TableSelectAll,
  TableSelectRow,
} from "carbon-components-react";

import { ReactComponent as Delete } from "../../assets/trash-can.svg";
import ModalStateManager from "../../components/modal/modal.component";
import { PostImage } from "../../components/post-image/post-image.component";

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
            header: "Image",
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
        const rows=data.map(({ id, image, text, likes }) => ({
          id: id,
          postId: id,
          imageLink: image,
          caption: text,
          likes: likes,
        }));
        setPostsTableRows(rows);
      })  
  }

  deleteSelectedRows = (selectedRows) => {
    const { setPostsTableRows, rows } = this.props;
    const filteredPosts = rows.filter(
      (row) => !selectedRows.some((selectedRow) => row.id === selectedRow.id)
    );
    setPostsTableRows(filteredPosts);
  };

  render() {
    const { rows, headers } = this.props;
    // console.log(rows);
    return (
      <div className="userpostpage">
        <div className="data-table">
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
                    <TableToolbar {...getToolbarProps()}>
                      <TableBatchActions {...getBatchActionProps()}>
                        <TableBatchAction
                          tabIndex={
                            getBatchActionProps().shouldShowBatchActions
                              ? 0
                              : -1
                          }
                          renderIcon={Delete}
                          onClick={() => this.deleteSelectedRows(selectedRows)}
                        >
                          Delete
                        </TableBatchAction>
                      </TableBatchActions>

                      <TableToolbarContent>
                        <TableToolbarSearch onChange={onInputChange} />
                        <ModalStateManager />
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
                                  <PostImage imageUrl={cell.value}/>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  user: { currentUser },
  userPosts: { userPosts },
  dataTableHeader: { headers },
  dataTableRows: {rows},
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
