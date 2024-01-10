"use client";
import { restClient } from "@polygon.io/client-js";
import { useEffect } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const productSales = [
  {
    name: "Jan",
    product1: 4000,
    product2: 2400,
  },
  {
    name: "Feb",
    product1: 3000,
    product2: 2210,
  },
  {
    name: "Mar",
    product1: 2000,
    product2: 2290,
  },
  {
    name: "Apr",
    product1: 2780,
    product2: 2000,
  },
  {
    name: "May",
    product1: 1890,
    product2: 2181,
  },
  {
    name: "Jun",
    product1: 2390,
    product2: 2500,
  },
];

const API_KEY = "SYKjPVarYlELnlMlImBdPPb5O1bOpjVK";

const rest = restClient(API_KEY);

function StockChart() {
  useEffect(() => {
    rest.stocks
      .aggregates("AAPL", 1, "day", "2023-01-01", "2023-04-14")
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.error("An error happened:", e);
      });
  }, []);

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart width={500} height={600} data={productSales}>
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Legend />
        <Tooltip content={<CustomTooltip />} />
        <Area dataKey="product1" type="monotone" />
        <Area
          dataKey="product2"
          fill="yellow"
          stroke="orange"
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Product 1:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Product 2:
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
    );
  }
};

export default StockChart;
