import React from "react";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { TimelineItem } from "../components/elements";
import { timelineData } from "../configs/experiences-data-config";

const Timeline = () =>
  timelineData.length > 0 && (
    <Box w="full">
      {timelineData.map((data, idx) => (
        <TimelineItem data={data} key={idx} />
      ))}
    </Box>
  );

export default function Experiences() {
  return (
    <Box py="10" id="experiences">
      <Center mb="10">
        <Heading as="h5" size="sm">
          Experiences
        </Heading>
      </Center>
      <Timeline />
    </Box>
  );
}
