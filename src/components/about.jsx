import React from "react";
import selfPortrait from "../images/self.svg";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/layout";
import { SocialMedia }  from '../components/elements'

export default function About(props) {
  return (
    <Box pt="10" pb="5" id="about">
      <Flex>
        <Box w="30%">
          <Center>
            <Image
              borderRadius="full"
              boxSize="180px"
              src={selfPortrait}
              alt="Anoop K. Chandran"
            />
          </Center>
          <Center pt="5">
            <Heading as="h4" size="md">
              Anoop K. Chandran
            </Heading>
          </Center>
          <Center pt="5">
          <SocialMedia color="gray.400"/>
          </Center>
        </Box>
        <Spacer />
        <Center w="70%">
          <Box>
            I am a computational{" "}
            <span className="emph">material scientist</span> passionate about
            sustainable <span className="emph">renewable energy</span>{" "}
            solutions. I develop tools and methods for the accelerated discovery
            of better <span className="emph">solar absorbers</span> using
            automated <span className="emph">high-throughput</span> workflows
            and <span className="emph">machine learning</span>.
          </Box>
        </Center>
      </Flex>
    </Box>
  );
}
