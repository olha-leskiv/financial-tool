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
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

function Charts({ stocks, index }) {
  const [frequency, setFrequency] = useState({
    label: "day",
    number: 24,
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
        [allItemsToCompare[i].label]: getRandomValue(i),
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
            <CartesianGrid strokeDasharray="1 3" />
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
                  fillOpacity={0.05}
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
            <CartesianGrid strokeDasharray="1 3" />
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
            <CartesianGrid strokeDasharray="1 3" />
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
            <CartesianGrid strokeDasharray="1 3" />
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
        <FormControl sx={{ m: 1, minWidth: 120, width: 220 }} size="small">
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
        <Stack direction="row" spacing={2}>
          <ToggleButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            onChange={(e, newValue) => setFrequency(newValue)}
            exclusive
            value={frequency.label}
            size="small"
          >
            <ToggleButton
              value={{
                label: "day",
                number: 24,
              }}
            >
              1D
            </ToggleButton>
            <ToggleButton value={{ label: "5days", number: 5 }}>
              5D
            </ToggleButton>
            <ToggleButton
              value={{
                label: "1M",
                number: 30,
                type: "days",
              }}
            >
              1M
            </ToggleButton>
            <ToggleButton
              value={{
                label: "6M",
                number: 30 * 6,
                type: "days",
              }}
            >
              6M
            </ToggleButton>
            <ToggleButton
              value={{
                label: "9M",
                number: 30 * 9,
                type: "days",
              }}
            >
              9M
            </ToggleButton>
            <ToggleButton
              value={{
                label: "1Y",
                number: 12,
                type: "months",
              }}
            >
              1Y
            </ToggleButton>
            <ToggleButton
              value={{
                label: "2Y",
                number: 12 * 2,
                type: "months",
              }}
            >
              2Y
            </ToggleButton>
            <ToggleButton
              value={{
                label: "5Y",
                number: 12 * 5,
                type: "months",
              }}
            >
              5Y
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            variant="outlined"
            size="small"
            exclusive
            onChange={(e, newValue) => setChartType(newValue)}
            value={chartType}
          >
            <ToggleButton aria-label="Barchart" value="barchart">
              <BarChartIcon />
            </ToggleButton>
            <ToggleButton aria-label="Linechart" value="linechart">
              <ShowChartIcon />
            </ToggleButton>
            <ToggleButton aria-label="Areachart" value="areachart">
              <LandscapeIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
      <ResponsiveContainer
        style={{ height: "200px", width: "100%", fontFamily: "monospace" }}
      >
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
