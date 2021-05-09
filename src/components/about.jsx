import React from "react";
import selfPortrait from "../images/self.svg";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/layout";
import { SocialMedia }  from '../components/elements'

export default function About(props) {
  return (
      <Flex  
      direction={["column", "column", "row", "row"]}
      id="about">
        <Box p="5" maxW={{base:"100%", md:"30%"}}>
            <Center pb="4">
              <Image
                borderRadius="full"
                boxSize="180px"
                src={selfPortrait}
                alt="Anoop K. Chandran"
              />
            </Center>
            <Box display="block">
              <Center>
              <Heading as="h4" pb="4" size={["sm","sm","md","md"]}>
                Anoop K. Chandran
              </Heading>
              </Center>
              <Center>
              <SocialMedia color="gray.400"/>
              </Center>
          </Box>
        </Box>
        <Box margin="auto" p="5" maxW={{base:"100%", md:"75%"}}>
            I am a computational{" "}
            <Text as="b">material scientist</Text> passionate about
            sustainable <Text as="b">renewable energy</Text>{" "}
            solutions. I develop tools and methods for the accelerated discovery
            of better <Text as="b">solar absorbers</Text> using
            automated <Text as="b">high-throughput</Text> workflows
            and <Text as="b">machine learning</Text>.
        </Box>
      </Flex>
  );
}
