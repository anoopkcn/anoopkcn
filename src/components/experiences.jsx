import React from "react";
import { Box, Center, Heading } from "@chakra-ui/layout";
import { TimelineItem } from "../components/elements";
import { timelineData } from "../configs/data-experiences-config";

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
        <Heading as="h4" size="md">
          Experiences
        </Heading>
      </Center>
      <Timeline />
    </Box>
  );
}
