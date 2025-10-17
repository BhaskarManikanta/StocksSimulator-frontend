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
    return <p className="no-data">No data available for {symbol}</p>;
  }

  const chartData = data.map((d) => ({
    ...d,
    timeLabel: formatDateTime(d.timestamp),
  }));

  const latest = chartData[chartData.length - 1];

  return (
    <div className="chart-container">
      <h3 className="chart-title">📈 {symbol} Price History</h3>

      <ResponsiveContainer width="100%" height={420}>
        <LineChart data={chartData}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

          {/* Axes */}
          <XAxis
            dataKey="timeLabel"
            tick={{ fontSize: 11, fill: "#cbd5e1" }}
            interval="preserveEnd"
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 11, fill: "#cbd5e1" }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(30,41,59,0.9)",
              border: "1px solid rgba(147,197,253,0.3)",
              borderRadius: "10px",
              color: "#f8fafc",
              backdropFilter: "blur(8px)",
            }}
            formatter={(value) => [`$${value}`, "Price"]}
            labelFormatter={(label) => `🕒 ${label}`}
          />

          {/* Gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          {/* Line with soft shadow */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ r: 4, fill: "#3b82f6" }}
            activeDot={{
              r: 7,
              fill: "#facc15",
              stroke: "#1f2937",
              strokeWidth: 2,
            }}
            animationDuration={1200}
          />

          {/* Highlight latest point */}
          <ReferenceDot
            x={latest.timeLabel}
            y={latest.price}
            r={6}
            fill="#facc15"
            stroke="#1e293b"
            strokeWidth={2}
            label={{
              value: `$${latest.price}`,
              position: "top",
              fill: "#facc15",
              fontSize: 13,
              fontWeight: "bold",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
