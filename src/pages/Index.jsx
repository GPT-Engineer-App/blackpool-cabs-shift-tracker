import React, { useState } from "react";
import { Box, Heading, Text, VStack, HStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Select } from "@chakra-ui/react";

import { FaPlus, FaChartLine } from "react-icons/fa";

const Index = () => {
  const [shifts, setShifts] = useState([]);
  const [date, setDate] = useState("");
  const [drivers, setDrivers] = useState("");
  const [bookings, setBookings] = useState("");
  const [revenue, setRevenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddShift = () => {
    const newShift = {
      date,
      drivers: parseInt(drivers),
      bookings: parseInt(bookings),
      revenue: parseFloat(revenue),
    };
    setShifts([...shifts, newShift]);
    setDate("");
    setDrivers("");
    setBookings("");
    setRevenue("");
  };

  const filteredShifts = shifts.filter((shift) => (!startDate || shift.date >= startDate) && (!endDate || shift.date <= endDate));

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Blackpool Cabs - Shift Recording
      </Heading>

      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Input placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input placeholder="Number of Drivers" value={drivers} onChange={(e) => setDrivers(e.target.value)} />
          <Input placeholder="Number of Bookings" value={bookings} onChange={(e) => setBookings(e.target.value)} />
          <Input placeholder="Revenue" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddShift}>
            Add Shift
          </Button>
        </HStack>

        <HStack spacing={4}>
          <Input placeholder="Start Date (YYYY-MM-DD)" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <Input placeholder="End Date (YYYY-MM-DD)" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </HStack>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Drivers</Th>
                <Th>Bookings</Th>
                <Th>Revenue</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredShifts.map((shift, index) => (
                <Tr key={index}>
                  <Td>{shift.date}</Td>
                  <Td>{shift.drivers}</Td>
                  <Td>{shift.bookings}</Td>
                  <Td>£{shift.revenue.toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
