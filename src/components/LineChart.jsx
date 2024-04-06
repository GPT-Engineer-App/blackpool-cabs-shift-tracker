import React from "react";
import { Box, Text } from "@chakra-ui/react";


const LineChart = ({ shifts, dataKeys }) => {
  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const dates = shifts.map((d) => new Date(d.date));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const scaleX = (date) => {
    return (
      ((date - minDate) / (maxDate - minDate)) * chartWidth
    );
  };

  const scaleY = (value, maxValue) => {
    return chartHeight - (value / maxValue) * chartHeight;
  };

  const getPathData = (key) => {
    const values = shifts.map((d) => d[key]);
    const maxValue = Math.max(...values);
    const points = shifts.map((d) => ({
      x: scaleX(new Date(d.date)),
      y: scaleY(d[key], maxValue),
    }));

    return points.reduce(
      (acc, point, i) =>
        `${acc}${i === 0 ? "M" : "L"} ${point.x} ${point.y}`,
      "",
    );
  };

    

  return (
    <Box position="relative" p={4}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {dataKeys.map((key, index) => {
            const color = ["#FF0000", "#00FF00", "#0000FF"][index];
            return <path key={key} d={getPathData(key)} fill="none" stroke={color} strokeWidth={2} />;
          })}
          <g transform={`translate(0, ${chartHeight})`}>
            <line x1={0} x2={chartWidth} stroke="currentColor" />
            {[...Array(5)].map((_, i) => {
              const date = new Date(
                minDate.getTime() +
                  (i * (maxDate - minDate)) / 4,
              );
              const x = scaleX(date);
              return (
                <g key={i} transform={`translate(${x}, 0)`}>
                  <line y2="6" stroke="currentColor" />
                  <text y="9" dy="0.71em" textAnchor="middle">
                    {date.toLocaleDateString()}
                  </text>
                </g>
              );
            })}
          </g>
          <g>
            {[...Array(5)].map((_, i) => {
              const maxValue = Math.max(
                ...dataKeys.map((key) =>
                  Math.max(...shifts.map((d) => d[key])),
                ),
              );
              const value = (i * maxValue) / 4;
              const y = scaleY(value, maxValue);
              return (
                <g key={i} transform={`translate(0, ${y})`}>
                  <line x2={chartWidth} stroke="currentColor" />
                  <text
                    x="-9"
                    y="0"
                    dy="0.32em"
                    textAnchor="end"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </Box>
  );
};

export default LineChart;
