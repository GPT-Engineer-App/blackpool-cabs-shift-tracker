import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const LineChart = ({ shifts }) => {
  if (shifts.length === 0) {
    return <Text>No data to display chart.</Text>;
  }

  const maxRevenue = Math.max(...shifts.map((shift) => shift.revenue));
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      {shifts.map((shift, index) => (
        <Flex key={index} justify="space-between" align="center" my={2}>
          <Text width="50px">{shift.date}</Text>
          <Box flex="1" height="10px" bg="green.200" mx={2}>
            <Box width={`${(shift.revenue / maxRevenue) * 100}%`} height="10px" bg="green.500" />
          </Box>
          <Text width="100px" textAlign="right">
            £{shift.revenue.toFixed(2)}
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default LineChart;
