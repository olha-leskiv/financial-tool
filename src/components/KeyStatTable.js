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
  price,
  volume,
  marketcap,
  dividend,
  peration,
  eps,
  beta
) {
  return { name, price, volume, marketcap, dividend, peration, eps, beta };
}

const headCells = [
  { id: "name", label: "Name" },
  { id: "price", label: "Price Change" },
  { id: "volume", label: "Volume" },
  { id: "marketcap", label: "Market Cap" },
  { id: "dividend", label: "Dividend Yield" },
  { id: "peration", label: "P/E Ratio" },
  { id: "eps", label: "EPS" },
  { id: "beta", label: "Beta" },
];

function getRandomValue() {
  return Math.trunc(Math.random() * 100);
}

function getRandomValueForPrice() {
  const randomNumber = Math.random();
  return randomNumber < 0.5
    ? "+" + Math.trunc(Math.random() * 100) / 100
    : Math.trunc(-Math.random() * 100) / 100;
}

const KeyStatTable = ({ stocks, index }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");

  let allItemsToCompare = [...stocks];
  if (index) {
    allItemsToCompare = [...stocks, index];
  }

  let rows = allItemsToCompare.map((item) => {
    return createData(
      item.label,
      getRandomValueForPrice(),
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
  }, [order, orderBy]);

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
                <Badge number={row.price} price />
              </TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.marketcap}</TableCell>
              <TableCell>{row.dividend}</TableCell>
              <TableCell>{row.peration}</TableCell>
              <TableCell>{row.eps}</TableCell>
              <TableCell>{row.beta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KeyStatTable;
