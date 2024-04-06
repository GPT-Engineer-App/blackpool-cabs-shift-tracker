import { HStack, Box, Text } from "@chakra-ui/react";

const LineChart = ({ dataKeys, colors }) => (
  <HStack position="absolute" top={0} right={0} spacing={4}>
    {dataKeys.map((key, index) => (
      <HStack key={key}>
        <Box width="20px" height="20px" backgroundColor={colors[index]} />
        <Text>{key}</Text>
      </HStack>
    ))}
  </HStack>
);

export default LineChart;
