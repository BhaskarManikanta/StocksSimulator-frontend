 import React from "react";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
  ReferenceDot,
} from "recharts";

import "./StockChart.css";

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  return `${date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  })} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const StockChart = ({ data, symbol }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <div className="empty-chart-icon">📉</div>

        <h3>No Chart Data</h3>

        <p>
          No stock history available for {symbol}
        </p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    timeLabel: formatDateTime(item.timestamp),
  }));

  const latest = chartData[chartData.length - 1];

  const previous =
    chartData[chartData.length - 2];

  const trend =
    previous &&
    latest.price > previous.price;

  return (
    <div className="chart-container">

      {/* HEADER */}
      <div className="chart-header">

        <div>
          <h2 className="chart-title">
            {symbol} Market Trend
          </h2>

          <p className="chart-subtitle">
            Live realtime stock movement
          </p>
        </div>

        <div
          className={`price-badge ${
            trend ? "positive" : "negative"
          }`}
        >
          {trend ? "▲" : "▼"} ${latest.price}
        </div>

      </div>

      {/* CHART */}
      <div className="chart-wrapper">

        <ResponsiveContainer
          width="100%"
          height={420}
        >
          <AreaChart data={chartData}>

            {/* GRADIENT */}
            <defs>

              <linearGradient
                id="stockGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>

            </defs>

            {/* GRID */}
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.06)"
            />

            {/* X AXIS */}
            <XAxis
              dataKey="timeLabel"
              tick={{
                fontSize: 11,
                fill: "#94a3b8",
              }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />

            {/* Y AXIS */}
            <YAxis
              domain={["auto", "auto"]}
              tick={{
                fontSize: 11,
                fill: "#94a3b8",
              }}
              tickLine={false}
              axisLine={false}
              width={60}
            />

            {/* TOOLTIP */}
            <Tooltip
              contentStyle={{
                background:
                  "rgba(15, 23, 42, 0.92)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius: "18px",

                color: "#ffffff",

                backdropFilter: "blur(12px)",
              }}

              labelStyle={{
                color: "#94a3b8",
                marginBottom: "8px",
              }}

              formatter={(value) => [
                `$${value}`,
                "Stock Price",
              ]}

              labelFormatter={(label) =>
                `🕒 ${label}`
              }
            />

            {/* AREA */}
            <Area
              type="monotone"
              dataKey="price"
              stroke="none"
              fill="url(#stockGradient)"
            />

            {/* LINE */}
            <Line
              type="monotone"
              dataKey="price"
              stroke={
                trend ? "#22c55e" : "#ef4444"
              }
              strokeWidth={3.5}

              dot={false}

              activeDot={{
                r: 7,
                fill: "#ffffff",
                stroke: trend
                  ? "#22c55e"
                  : "#ef4444",
                strokeWidth: 3,
              }}

              animationDuration={900}
            />

            {/* LATEST POINT */}
            <ReferenceDot
              x={latest.timeLabel}
              y={latest.price}

              r={6}

              fill={
                trend ? "#22c55e" : "#ef4444"
              }

              stroke="#0f172a"
              strokeWidth={3}
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default StockChart;