import React from "react";
import { Box, Text } from "@chakra-ui/react";

const LineChart = ({ shifts, dataKeys }) => {
  const width = 500;
  const height = 300;

  const scaleX = (date) => {};
  const scaleY = (value, max) => {};

  const getPathData = (key) => {};

  return (
    <Box position="relative" p={4}>
      <svg width={width} height={height}>
        {dataKeys.map((key, index) => {
          const color = ["#FF0000", "#00FF00", "#0000FF"][index];
          return <path key={key} d={getPathData(key)} fill="none" stroke={color} strokeWidth={2} />;
        })}
      </svg>
    </Box>
  );
};

export default LineChart;
