import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import PP_hex from "./images/pp_hex.png";


export default function SolarAbsorbers() {
  return (
    <Box>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem totam, optio, quia similique veritatis aliquam itaque consequatur unde beatae est nemo? Aperiam odit doloremque architecto unde voluptatem tempora sunt quibusdam?
      <Center pb="2" pt="5">
        <Image src={PP_hex} w="50%" alt="simple-mpi" />
      </Center>
      <Center pt="2" pb="5">
        <Text color="gray.500">Fig 0. Photovoltaic Potential Hexagon </Text>
      </Center>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, eligendi commodi facere minima hic quam vel tenetur rem necessitatibus aperiam ipsum! Necessitatibus quis officia minima omnis libero eaque qui quae!

    </Box>
  );
}
