import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import Badge from "./Badge";
import { useState, useMemo, useEffect } from "react";

function createData(
  name,
  oned,
  fived,
  onem,
  threem,
  sixm,
  oney,
  threey,
  fivey
) {
  return { name, oned, fived, onem, threem, sixm, oney, threey, fivey };
}

const headCells = [
  { id: "name", label: "Name" },
  { id: "oned", label: "1 Day" },
  { id: "fived", label: "5 Days" },
  { id: "onem", label: "1 Month" },
  { id: "threem", label: "3 Months" },
  { id: "sixm", label: "6 Months" },
  { id: "oney", label: "1 Year" },
  { id: "threey", label: "3 Years" },
  { id: "fivey", label: "5 Years" },
];

function getRandomValue() {
  const randomNumber = Math.random();
  return randomNumber < 0.5
    ? "+" + Math.trunc(Math.random() * 100) / 100
    : Math.trunc(-Math.random() * 100) / 100;
}

const PerfomanceTable = ({ stocks, index }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");

  let allItemsToCompare = [...stocks];
  if (index) {
    allItemsToCompare = [...stocks, index];
  }

  let rows = allItemsToCompare.map((item) => {
    return createData(
      item.label,
      getRandomValue(),
      getRandomValue(),
      getRandomValue(),
      getRandomValue(),
      getRandomValue(),
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
                <Badge number={row.oned} />
              </TableCell>
              <TableCell>
                <Badge number={row.fived} />
              </TableCell>
              <TableCell>
                <Badge number={row.onem} />
              </TableCell>
              <TableCell>
                <Badge number={row.threem} />
              </TableCell>
              <TableCell>
                <Badge number={row.sixm} />
              </TableCell>
              <TableCell>
                <Badge number={row.oney} />
              </TableCell>
              <TableCell>
                <Badge number={row.threey} />
              </TableCell>
              <TableCell>
                <Badge number={row.fivey} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PerfomanceTable;
