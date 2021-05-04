import React from "react";
import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import {TitleTag} from "../components/elements"
import {FaPython} from "react-icons/fa"

export default function Projects(props) {
  const bg = useColorModeValue("#A8C0D1", "#26476D");
  return (
    <Box py="10" id="projects">
      <Center mb="10">
          <Heading as="h5" size="sm">
            Projects
          </Heading>
      </Center>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem p="5" bg={bg} borderRadius="3">
          <TitleTag title="hello" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          repellendus iusto vitae perferendis inventore eligendi culpa, pariatur
          magnam totam voluptates atque laudantium qui debitis reiciendis
          consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem bg={bg} borderRadius="3"/>
        <GridItem p="5" bg={bg} borderRadius="3">
          <TitleTag title="my python project" icon={FaPython} role="developer" type="academic"/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          repellendus iusto vitae perferendis inventore eligendi culpa, pariatur
          magnam totam voluptates atque laudantium qui debitis reiciendis
          consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem bg={bg} borderRadius="3"/>
      </Grid>
    </Box>
  );
}
