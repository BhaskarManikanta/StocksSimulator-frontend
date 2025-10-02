import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot,
} from "recharts";
import "./StockChart.css";

const formatDateTime = (ts) => {
  const d = new Date(ts);
  return `${d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

const StockChart = ({ data, symbol }) => {
  if (!data || data.length === 0) {
    return <p>No data available for {symbol}</p>;
  }

  const chartData = data.map((d) => ({
    ...d,
    timeLabel: formatDateTime(d.timestamp),
  }));

  const latest = chartData[chartData.length - 1];

  return (
    <div className="chart-container">
      <h3>📈 {symbol} Price History</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          {/* Light grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          {/* Axis styles */}
          <XAxis
            dataKey="timeLabel"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            interval="preserveEnd"
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #4b5563",
              borderRadius: "8px",
              color: "#f3f4f6",
            }}
            formatter={(value) => [`$${value}`, "Price"]}
            labelFormatter={(label) => `⏰ ${label}`}
          />

          {/* Line with gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="price"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ r: 4, fill: "#6366f1" }}
            activeDot={{ r: 6, fill: "#facc15", stroke: "#1f2937", strokeWidth: 2 }}
          />

          {/* Annotation: latest price */}
          <ReferenceDot
            x={latest.timeLabel}
            y={latest.price}
            r={6}
            fill="#facc15"
            stroke="#1f2937"
            strokeWidth={2}
            label={{
              value: `$${latest.price}`,
              position: "top",
              fill: "#facc15",
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
