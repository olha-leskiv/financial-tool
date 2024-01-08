"use client";
import { useEffect, useState } from "react";
import "@fontsource/roboto";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LandscapeIcon from "@mui/icons-material/Landscape";

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  Box,
  OutlinedInput,
  Paper,
  Grid,
  Container,
  Stack,
  Autocomplete,
  TextField,
  ButtonGroup,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

function Charts({ stocks, index }) {
  const [frequency, setFrequency] = useState({
    label: "day",
    number: 700,
  });
  const [chartType, setChartType] = useState("linechart");
  const [metric, setMetric] = useState(comparisonMetric[0]);

  let allItemsToCompare = [...stocks];
  if (index) {
    allItemsToCompare = [...stocks, index];
  }

  let renderedData = [];
  renderedData = createRenderedData();

  function createRenderedData() {
    let result = [];
    for (let i = 0; i < frequency.number; i++) {
      let stocksInfo = getStocksInfo();
      result.push({ date: i + 1, ...stocksInfo });
    }
    return result;
  }

  function getStocksInfo() {
    let stocksInfo = {};
    for (let i = 0; i < allItemsToCompare.length; i++) {
      stocksInfo = {
        ...stocksInfo,
        [allItemsToCompare[i].label]: getRandomValue(200),
      };
    }
    return stocksInfo;
  }

  const content = (type) => {
    switch (type) {
      case "areachart":
        return (
          <AreaChart
            data={renderedData}
            style={{ fontFamily: "Roboto', sans-serif" }}
          >
            <YAxis />
            <XAxis dataKey="date" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip />
            {allItemsToCompare.map((item, index) => {
              return (
                <Area
                  dataKey={item.label}
                  fill={getChartColor(index)}
                  stroke={getChartColor(index)}
                  key={index}
                  dot={false}
                />
              );
            })}
          </AreaChart>
        );

      case "linechart":
        return (
          <LineChart data={renderedData}>
            <YAxis />
            <XAxis dataKey="date" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip />
            {allItemsToCompare.map((item, index) => {
              return (
                <Line
                  dataKey={item.label}
                  fill={getChartColor(index)}
                  stroke={getChartColor(index)}
                  key={index}
                  dot={false}
                />
              );
            })}
          </LineChart>
        );

      case "barchart":
        return (
          <BarChart data={renderedData}>
            <YAxis />
            <XAxis dataKey="date" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip />
            {allItemsToCompare.map((item, index) => {
              return (
                <Bar
                  dataKey={item.label}
                  fill={getChartColor(index)}
                  stroke={getChartColor(index)}
                  key={index}
                />
              );
            })}
          </BarChart>
        );

      default:
        return (
          <LineChart data={renderedData}>
            <YAxis />
            <XAxis dataKey="date" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip />
            {allItemsToCompare.map((item, index) => {
              return (
                <Line
                  dataKey={item.label}
                  fill={getChartColor(index)}
                  stroke={getChartColor(index)}
                />
              );
            })}
          </LineChart>
        );
    }
  };

  const handleMetricChange = (event, newValue) => {
    setMetric({ label: event.target.value });
  };

  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-standard-label">Metric</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={metric.label}
            onChange={handleMetricChange}
            label="Metric"
          >
            {comparisonMetric.map((metric) => {
              return (
                <MenuItem value={metric.label} key={metric.label}>
                  {metric.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          size="small"
        >
          <Button
            onClick={() =>
              setFrequency({
                label: "day",
                number: 24,
              })
            }
          >
            1D
          </Button>
          <Button
            onClick={() =>
              setFrequency({
                label: "5days",
                number: 5,
              })
            }
          >
            5D
          </Button>
          <Button
            onClick={() =>
              setFrequency({
                label: "1M",
                number: 30,
                type: "days",
              })
            }
          >
            1M
          </Button>
          <Button
            onClick={() =>
              setFrequency({
                label: "6M",
                number: 30 * 6,
                type: "days",
              })
            }
          >
            6M
          </Button>
          <Button
            onClick={() =>
              setFrequency({
                label: "9M",
                number: 30 * 9,
                type: "days",
              })
            }
          >
            9M
          </Button>
          <Button
            onClick={() =>
              setFrequency({
                label: "1Y",
                number: 12,
                type: "months",
              })
            }
          >
            1Y
          </Button>
          <Button
            onClick={() =>
              setFrequency({
                label: "2Y",
                number: 12 * 2,
                type: "months",
              })
            }
          >
            2Y
          </Button>
          <Button
            onClick={() =>
              setFrequency({
                label: "5Y",
                number: 12 * 5,
                type: "months",
              })
            }
          >
            5Y
          </Button>
        </ButtonGroup>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          size="small"
        >
          <Button onClick={() => setChartType("barchart")} title="Barchart">
            <BarChartIcon />
          </Button>
          <Button onClick={() => setChartType("linechart")}>
            <ShowChartIcon />
          </Button>
          <Button onClick={() => setChartType("areachart")}>
            <LandscapeIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <ResponsiveContainer height="100%" width="100%">
        {content(chartType)}
      </ResponsiveContainer>
    </>
  );
}

export default Charts;

function getChartColor(index) {
  if (index === 0) {
    return "#FDB022";
  }
  if (index === 1) {
    return "#F04438";
  }
  if (index === 2) {
    return "#12B76A";
  }
  if (index === 3) {
    return "#9E77ED";
  }
  if (index === 4) {
    return "##667085";
  }
  if (index === 5) {
    return "#194185";
  }
}

function getRandomValue(basis) {
  return Math.random() * 50 + basis;
}

const comparisonMetric = [
  {
    label: "Price Change",
  },
  {
    label: "Dividend Yield",
  },
  {
    label: "P/E Ratio",
  },
  {
    label: "Perfomance",
  },
  {
    label: "Net Income",
  },
  {
    label: "Net Margins",
  },
  {
    label: "ROE",
  },
  {
    label: "ROA",
  },
  {
    label: "Consensus Price Target",
  },
];
