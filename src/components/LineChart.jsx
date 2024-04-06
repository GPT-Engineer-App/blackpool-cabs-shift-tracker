import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

const LineChart = ({ shifts, dataKeys }) => {
  if (shifts.length === 0) {
    return <Text>No data to display chart.</Text>;
  }

  const dataRanges = dataKeys.map((key) => {
    const values = shifts.map((shift) => shift[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max, range: max - min };
  });

  const colors = ["green", "blue", "red"];

  return (
    <Box position="relative" width="100%" height="300px">
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
          {dataKeys.map((key, keyIndex) => (
            <polyline
              key={key}
              points={shifts
                .map((shift, index) => {
                  const x = (index / (shifts.length - 1)) * 100;
                  const y = 100 - ((shift[key] - dataRanges[keyIndex].min) / dataRanges[keyIndex].range) * 100;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke={colors[keyIndex]}
              strokeWidth="2"
            />
          ))}
        </svg>
      </Box>
      <Box position="absolute" top={0} left={0} right={0} bottom={0} pointerEvents="none">
        {shifts.map((shift, index) => (
          <Text key={index} position="absolute" left={`${(index / (shifts.length - 1)) * 100}%`} bottom="-20px" transform="translateX(-50%)" fontSize="12px">
            {new Date(shift.date).toLocaleDateString()}
          </Text>
        ))}
      </Box>
      <HStack position="absolute" top={0} right={0} spacing={4}>
        {dataKeys.map((key, index) => (
          <HStack key={key}>
            <Box width="20px" height="20px" backgroundColor={colors[index]} />
            <Text>{key}</Text>
          </HStack>
        ))}
      </HStack>
    </Box>
  );
};

export default LineChart;
