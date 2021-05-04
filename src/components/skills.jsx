import { Box, Center, Heading, Grid, GridItem} from "@chakra-ui/layout";
import React from "react";
import { useColorModeValue } from "@chakra-ui/react";

export default function Skills(props) {
  const bg = useColorModeValue("#A4BEB1", "#11515B");
  return (
    <Box py="10" id ="skills">
      <Center mb="10">
          <Heading as="h5" size="sm">
            Skills
          </Heading>
      </Center>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem p="5" bg={bg} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus iusto vitae perferendis inventore eligendi culpa, pariatur magnam totam voluptates atque laudantium qui debitis reiciendis consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem p="5" bg={bg} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus iusto vitae perferendis inventore eligendi culpa, pariatur magnam totam voluptates atque laudantium qui debitis reiciendis consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem p="5" bg={bg} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus iusto vitae perferendis inventore eligendi culpa, pariatur magnam totam voluptates atque laudantium qui debitis reiciendis consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem p="5" bg={bg} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus iusto vitae perferendis inventore eligendi culpa, pariatur magnam totam voluptates atque laudantium qui debitis reiciendis consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem p="5" bg={bg} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus iusto vitae perferendis inventore eligendi culpa, pariatur magnam totam voluptates atque laudantium qui debitis reiciendis consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem p="5" bg={bg} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus iusto vitae perferendis inventore eligendi culpa, pariatur magnam totam voluptates atque laudantium qui debitis reiciendis consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem p="5" bg={bg} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus iusto vitae perferendis inventore eligendi culpa, pariatur magnam totam voluptates atque laudantium qui debitis reiciendis consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
        <GridItem p="5" bg={bg} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus iusto vitae perferendis inventore eligendi culpa, pariatur magnam totam voluptates atque laudantium qui debitis reiciendis consequuntur eveniet officiis. Expedita, dolor!
        </GridItem>
      </Grid>
    </Box>
  );
}
