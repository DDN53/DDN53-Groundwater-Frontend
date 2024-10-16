import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { useDispatch, useSelector } from "react-redux";
import RemoveWell from "./RemoveInfo";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import API from "../../api";
import { getUserDataFromToken } from "../../utils/userValidation";
import Tooltip from "@mui/material/Tooltip";
InfoTable.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  // Add other prop types as needed
};

function InfoTable() {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const searchQuery = useSelector((state) => state.searchQuery);
  const SelectedDistrict = useSelector((state) => state.selectedDistrict);
  const SelectedSort = useSelector((state) => state.selectedWellSort);
  const [rowss, setRowss] = useState([]);
  const userData = getUserDataFromToken().result;
  const [user, setUser] = useState(userData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await API.viewallmonthlydata();

      let sortedData;

      switch (SelectedSort) {
        case "SDA":
          sortedData = data?.data.sort((a, b) =>
            a.SampleDate.localeCompare(b.SampleDate)
          );
          break;
        case "SDD":
          sortedData = data?.data.sort((a, b) =>
            b.SampleDate.localeCompare(a.SampleDate)
          );
          break;
        case "WIA":
          sortedData = data?.data.sort((a, b) =>
            a.newWellNo.localeCompare(b.newWellNo)
          );
          break;
        case "WID":
          sortedData = data?.data.sort((a, b) =>
            b.newWellNo.localeCompare(a.newWellNo)
          );
          break;
        case "CDA":
          sortedData = data?.data.sort((a, b) =>
            a.createdAt.localeCompare(b.createdAt)
          );
          break;
        case "CDD":
          sortedData = data?.data.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          );
          break;
        default:
          sortedData = data?.data.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          );
          break;
      }
      setRowss(sortedData);
    };
    fetchData();
  }, [SelectedSort]);

  const [rows, setRows] = useState(rowss);
  useEffect(() => {
    setRows(rowss);
  }, [rowss]);

  const filteredRows = rows
    .filter((row) =>
      row.newWellNo.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (row) =>
        SelectedDistrict === "" ||
        row.Well?.selectedDistrict === SelectedDistrict
    );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFirstPageButtonClick = (event) => {
    handleChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    handleChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    handleChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    handleChangePage(
      event,
      Math.max(0, Math.ceil(filteredRows.length / rowsPerPage) - 1)
    );
  };

  const [showRemoveWell, setShowRemoveWell] = useState(false);
  const [selectedWellId, setSelectedWellId] = useState(null);

  const handleRemoveClick = (mid) => {
    setSelectedWellId(mid);
    setShowRemoveWell(true);
  };

  const handleCloseRemoveWell = () => {
    setShowRemoveWell(false);
  };

  const handleRemoveWell = (removedWellId) => {
    // Update the state or data used to render the table
    setRows((prevRows) => prevRows.filter((row) => row.mid !== removedWellId));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: "",
    });

    dispatch({
      type: "SET_SELECTED_DISTRICT",
      payload: "",
    });
  }, [dispatch]);

  return (
    <div className="mx-6">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Well ID</TableCell>
              <TableCell align="right">Sample Date</TableCell>
              <TableCell align="right">district/province</TableCell>
              <TableCell align="right">Sample ID</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No wells found.
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? filteredRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredRows
              ).map((row) => (
                <TableRow key={row.mid}>
                  <TableCell component="th" scope="row">
                    {row.newWellNo}
                  </TableCell>
                  <TableCell align="right" className="flex flex-col">
                    <div>{row.SampleDate}</div>
                  </TableCell>
                  <TableCell align="right" className="flex flex-col">
                    <div>{row.Well?.selectedDistrict}</div>
                    <div>{row.Well?.selectedProvince}</div>
                  </TableCell>
                  <TableCell align="right" className="flex flex-col">
                    <div>{row.mid}</div>
                  </TableCell>
                  <TableCell align="right" className="flex flex-row space-x-2">
                    <button
                      onClick={() => {
                        dispatch({
                          type: "SET_SAMPLE_ID",
                          payload: row.mid,
                        });
                        navigate("/viewmonthlyinfo", { replace: true });
                      }}
                      className="p-[6px] bg-violet-500 rounded-md text-white  hover:bg-violet-700"
                    >
                      View
                    </button>
                    {["Super", "Admin", "Editor"].includes(user.userRole) && (
                      <button
                        wellid={row.mid}
                        onClick={() => {
                          dispatch({
                            type: "SET_SAMPLE_ID",
                            payload: row.mid,
                          });
                          navigate("/editmonthlyinfo", { replace: true });
                        }}
                        className="p-[6px] bg-blue-500 rounded-md text-white  hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    )}
                    {["Super", "Admin"].includes(user.userRole) && (
                      <button
                        className={`p-[6px]  rounded-md text-white  ${
                          row.used === true
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-700"
                        }`}
                        onClick={() => handleRemoveClick(row.mid)}
                      >
                        Remove
                      </button>
                    )}

                    {showRemoveWell && (
                      <RemoveWell
                        onClose={handleCloseRemoveWell}
                        wellId={selectedWellId}
                        onRemove={handleRemoveWell}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={(subProps) => {
                  const { onPageChange, page } = subProps;
                  return (
                    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                      <IconButton
                        onClick={(event) => handleFirstPageButtonClick(event)}
                        disabled={page === 0}
                        aria-label="first page"
                      >
                        {theme.direction === "rtl" ? (
                          <LastPageIcon />
                        ) : (
                          <FirstPageIcon />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={(event) => handleBackButtonClick(event)}
                        disabled={page === 0}
                        aria-label="previous page"
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={(event) => handleNextButtonClick(event)}
                        disabled={
                          page >=
                          Math.ceil(filteredRows.length / rowsPerPage) - 1
                        }
                        aria-label="next page"
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={(event) => handleLastPageButtonClick(event)}
                        disabled={
                          page >=
                          Math.ceil(filteredRows.length / rowsPerPage) - 1
                        }
                        aria-label="last page"
                      >
                        {theme.direction === "rtl" ? (
                          <FirstPageIcon />
                        ) : (
                          <LastPageIcon />
                        )}
                      </IconButton>
                    </Box>
                  );
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

InfoTable.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default InfoTable;
