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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import Tooltip from "@mui/material/Tooltip";
import { getUserDataFromToken } from "../../utils/userValidation";

function InfoTable() {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const searchQuery = useSelector((state) => state.searchQuery);
  const SelectedDistrict = useSelector((state) => state.selectedDistrict);
  const SelectedSort = useSelector((state) => state.selectedWellSort);
  const [rowss, setRowss] = useState([]);
  const userData = getUserDataFromToken().result;
  const [user] = useState(userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.viewdrills();

        // Check if the response is an array and perform filtering
        if (Array.isArray(response)) {
          // Filter the data to remove duplicates (based on 'wellId' or 'wellNumber')
          const uniqueData = response.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.wellId === value.wellId)
          );
  
          let sortedData;
  
          // Sort the filtered unique data based on selected sort criteria
          switch (SelectedSort) {
            case "WIA":
              sortedData = uniqueData.sort((a, b) =>
                a.wellNumber.localeCompare(b.wellNumber)
              );
              break;
            case "WID":
              sortedData = uniqueData.sort((a, b) =>
                b.wellNumber.localeCompare(a.wellNumber)
              );
              break;
            case "CDA":
              sortedData = uniqueData.sort((a, b) =>
                a.createdAt.localeCompare(b.createdAt)
              );
              break;
            case "CDD":
              sortedData = uniqueData.sort((a, b) =>
                b.createdAt.localeCompare(a.createdAt)
              );
              break;
            default:
              sortedData = uniqueData.sort((a, b) =>
                b.createdAt.localeCompare(a.createdAt)
              );
              break;
          }
  
          // Set the sorted data to the state
          setRowss(sortedData);
        } else {
          console.error("Invalid response structure:", response);
          setRowss([]); // Handle invalid response structure
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRowss([]); // Handle errors during data fetch
      }
    };
  
    fetchData();
  }, [SelectedSort]);
  
  
  

  const [rows, setRows] = useState(rowss);
  useEffect(() => {
    setRows(rowss);
  }, [rowss]);

  const filteredRows = rows
    .filter((row) =>
      row.wellNumber.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleRemoveClick = (wellId) => {
    setSelectedWellId(wellId);
    setShowRemoveWell(true);
  };

  const handleCloseRemoveWell = () => {
    setShowRemoveWell(false);
  };

  const handleRemoveWell = (removedWellId) => {
    setRows((prevRows) => prevRows.filter((row) => row.wellId !== removedWellId));
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
              <TableCell>Well Number</TableCell>
              <TableCell align="right">Project Office</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Drill Log  OIC</TableCell>
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
                <TableRow key={row.wellId}>
                  <TableCell component="th" scope="row">
                    {row.wellNumber}
                  </TableCell>
                  <TableCell align="right">
                    {row.ProjectOffice}
                  </TableCell>
                  <TableCell align="right">
                    {row.location}
                  </TableCell>
                  <TableCell align="right">
                    {row.waterSampleOicName}
                  </TableCell>
                  <TableCell align="right" className="flex space-x-2">
                    <button
                      onClick={() => {
                        dispatch({
                          type: "SET_SAMPLE_ID",
                          payload: row.wellId,
                        });
                        navigate("/viewdrillinfo", { replace: true });
                      }}
                      className="p-[6px] bg-violet-500 rounded-md text-white hover:bg-violet-700"
                    >
                      View
                    </button>
                    {["Super", "Admin", "Editor"].includes(user.userRole) && (
                      <button
                        wellid={row.wellId}
                        onClick={() => {
                          dispatch({
                            type: "SET_SAMPLE_ID",
                            payload: row.wellId,
                          });
                          navigate("/editmonthlyinfo", { replace: true });
                        }}
                        className="p-[6px] bg-blue-500 rounded-md text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    )}
                    {["Super", "Admin"].includes(user.userRole) && (
                      <button
                        className={`p-[6px] rounded-md text-white ${
                          row.used === true
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-700"
                        }`}
                        onClick={() => handleRemoveClick(row.wellId)}
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
                  inputProps: { "aria-label": "rows per page" },
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
