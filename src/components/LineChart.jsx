import React from "react";
import { Box, Text } from "@chakra-ui/react";

const LineChart = ({ shifts, dataKeys }) => {
  const width = 500;
  const height = 300;

  const scaleX = (date) => {
    const minDate = new Date(shifts[0].date);
    const maxDate = new Date(shifts[shifts.length - 1].date);
    const domain = maxDate - minDate;
    const range = width - 60;
    const x = ((new Date(date) - minDate) / domain) * range + 30;
    return x;
  };

  const scaleY = (value, max) => {
    const domain = max;
    const range = height - 60;
    const y = height - ((value / domain) * range + 30);
    return y;
  };

  const getPathData = (key) => {
    const max = Math.max(...shifts.map((shift) => shift[key]));
    const points = shifts.map((shift) => ({
      x: scaleX(shift.date),
      y: scaleY(shift[key], max),
    }));
    const pathData = `M ${points[0].x},${points[0].y} ${points
      .slice(1)
      .map((point) => `L ${point.x},${point.y}`)
      .join(" ")}`;
    return pathData;
  };

  return (
    <Box position="relative" p={4}>
      <svg width={width} height={height}>
        <g transform="translate(30, 30)">
          <line x1={0} y1={height - 60} x2={width - 60} y2={height - 60} stroke="#ccc" />
          <line x1={0} y1={0} x2={0} y2={height - 60} stroke="#ccc" />
          {shifts.map((shift, index) => (
            <text key={`x-label-${index}`} x={scaleX(shift.date)} y={height - 40} textAnchor="middle">
              {new Date(shift.date).toLocaleDateString()}
            </text>
          ))}
        </g>
        {dataKeys.map((key, index) => {
          const color = ["#FF0000", "#00FF00", "#0000FF"][index];
          return <path key={key} d={getPathData(key)} fill="none" stroke={color} strokeWidth={2} />;
        })}
      </svg>
    </Box>
  );
};

export default LineChart;
