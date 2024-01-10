import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const data = [
  { name: "String Sell", value: 1, color: "#FA6C4D" },
  { name: "Sell", value: 1, color: "#FA4D4D" },
  { name: "Moderate Sell", value: 1, color: "#FA4D5E" },
  { name: "Hold", value: 1, color: "#8A3FFC" },
  { name: "Moderate Buy", value: 1, color: "#604DFD" },
  { name: "Buy", value: 1, color: "#2E92CF" },
  { name: "Strong Buy", value: 1, color: "#08BD92" },
];
const cx = 30;
const cy = 30;
const iR = 26;
const oR = 30;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 2;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key={value} />,
    <path
      key={value + 1}
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ];
};

const AnalystRatePieChart = ({ buysellcode }) => {
  return (
    <PieChart width={90} height={50}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(buysellcode, data, cx, cy, iR, oR, "#212121")}
    </PieChart>
  );
};

export default AnalystRatePieChart;
