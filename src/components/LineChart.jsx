import React from "react";
import { Box, Text } from "@chakra-ui/react";

const LineChart = ({ shifts }) => {
  if (shifts.length === 0) {
    return <Text>No data to display chart.</Text>;
  }

  const maxRevenue = Math.max(...shifts.map((shift) => shift.revenue));
  const minRevenue = Math.min(...shifts.map((shift) => shift.revenue));
  const revenueRange = maxRevenue - minRevenue;

  return (
    <Box position="relative" width="100%" height="200px">
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
          {shifts.map((shift, index) => {
            const x = (index / (shifts.length - 1)) * 100;
            const y = 100 - ((shift.revenue - minRevenue) / revenueRange) * 100;
            return <circle key={index} cx={x} cy={y} r="2" fill="green" />;
          })}
          <polyline
            points={shifts
              .map((shift, index) => {
                const x = (index / (shifts.length - 1)) * 100;
                const y = 100 - ((shift.revenue - minRevenue) / revenueRange) * 100;
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="green"
            strokeWidth="2"
          />
        </svg>
      </Box>
      <Box position="absolute" top={0} left={0} right={0} bottom={0} pointerEvents="none">
        {shifts.map((shift, index) => (
          <Text key={index} position="absolute" left={`${(index / (shifts.length - 1)) * 100}%`} bottom="-20px" transform="translateX(-50%)" fontSize="12px">
            {new Date(shift.date).toLocaleDateString()}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default LineChart;
