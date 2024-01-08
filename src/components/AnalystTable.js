import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import AnalystRatePieChart from "./AnalystRatePieChart";
import { Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";

function createData(name, consensus, crating, news, cprice) {
  return { name, consensus, crating, news, cprice };
}

const headCells = [
  { id: "name", label: "Name" },
  { id: "consensus", label: "Analyst Consensus" },
  { id: "crating", label: "Consensus Rating" },
  { id: "news", label: "News Sentiment" },
  { id: "cprice", label: "Consensus Price Target" },
];

function getRandomValue() {
  return Math.trunc(Math.random() * 100);
}

function getBuySellCode() {
  return Math.trunc(Math.random() * 7);
}

const AnalystTable = ({ stocks, index }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");

  let allItemsToCompare = [...stocks];
  if (index) {
    allItemsToCompare = [...stocks, index];
  }

  let rows = allItemsToCompare.map((item) => {
    return createData(
      item.label,
      getBuySellCode(),
      getRandomValue(),
      getRandomValue(),
      getRandomValue()
    );
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => {
    const comparator = (a, b) => {
      if (order === "asc") {
        return a[orderBy] - b[orderBy];
      } else {
        return b[orderBy] - a[orderBy];
      }
    };
    return rows.sort(comparator);
  }, [order, orderBy, stocks, index]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="sortable table">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleRequestSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>

              <TableCell>
                <AnalystRatePieChart buysellcode={row.consensus} />
                {row.eps}
              </TableCell>
              <TableCell>{formateBuySellCode(row.consensus)}</TableCell>
              <TableCell>{row.news}</TableCell>
              <TableCell>{row.cprice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnalystTable;

function formateBuySellCode(code) {
  switch (code) {
    case 1:
      return (
        <Typography variant="body1" sx={{ color: "#f44336" }}>
          Strong Sell
        </Typography>
      );
    case 2:
      return (
        <Typography variant="body1" sx={{ color: "#ff9800" }}>
          Strong Sell
        </Typography>
      );
    case 3:
      return (
        <Typography variant="body1" sx={{ color: "#E1CA00" }}>
          Sell
        </Typography>
      );
    case 4:
      return (
        <Typography variant="body1" sx={{ color: "#4caf50" }}>
          Hold
        </Typography>
      );
    case 5:
      return (
        <Typography variant="body1" sx={{ color: "#009688" }}>
          Moderate Buy
        </Typography>
      );
    case 6:
      return (
        <Typography variant="body1" sx={{ color: "#2196f3" }}>
          Buy
        </Typography>
      );
    case 7:
      return (
        <Typography variant="body1" sx={{ color: "#3f51b5" }}>
          Strong Buy
        </Typography>
      );
    default:
      return (
        <Typography variant="body1" sx={{ color: "#4caf50" }}>
          Hold
        </Typography>
      );
  }
}
