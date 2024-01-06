"use client";
import { useEffect, useState } from "react";
import { restClient } from "@polygon.io/client-js";

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

let renderedData = [
  {
    date: 1,
    META: 4000,
    NVDA: 2400,
  },
  {
    date: 2,
    META: 3000,
    NVDA: 2210,
  },
  {
    date: 3,
    META: 2000,
    NVDA: 2290,
  },
  {
    date: 4,
    META: 2780,
    NVDA: 2000,
  },
  {
    date: 5,
    META: 1890,
    NVDA: 2181,
  },
  {
    date: 6,
    META: 2390,
    NVDA: 2500,
  },
];

const API_KEY = "SYKjPVarYlELnlMlImBdPPb5O1bOpjVK";
const rest = restClient(API_KEY);

function Charts({ stocks, index }) {
  const [frequency, setFrequency] = useState("month");

  stocks.map((stock, index) => {
    if (!stock) return;
    return rest.stocks
      .aggregates(stock.label, 1, frequency, "2023-01-01", "2023-12-01")
      .then((data) => {
        console.log(data);
        return data;

        console.log(
          data.results.map((price, index) => {
            return { price: price.c, date: index };
          })
        );
      })
      .catch((e) => {
        console.error("An error happened:", e);
      });
  });

  const content = (type) => {
    switch (type) {
      case "areachart":
        return (
          <AreaChart data={renderedData}>
            <YAxis />
            <XAxis dataKey="date" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip />
            <Area dataKey="META" />
            <Area dataKey="NVDA" fill="#FDB022" stroke="#FDB022" />
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
            <Line dataKey="META" stroke="#F04438" />
            <Line dataKey="NVDA" stroke="#FDB022" />
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
            <Bar dataKey="META" fill="#F04438" />
            <Bar dataKey="NVDA" fill="#FDB022" />
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
            <Bar dataKey="META" type="monotone" />
            <Bar dataKey="NVDA" stroke="#FDB022" />
          </LineChart>
        );
    }
  };

  return (
    <ResponsiveContainer height="100%" width="100%">
      {content("linechart")}
    </ResponsiveContainer>
  );
}

export default Charts;
