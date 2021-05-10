import {
  chakra,
  Flex,
  useColorModeValue,
  Heading,
  Box,
  Text,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Li, MenuItem } from "./elements";
import siteConfig from "../configs/site-config";
import { SocialMedia }  from '../components/elements'

function FooterContent() {
  const mediaIconColor=useColorModeValue("#363B72", "#ABACCA")
  return (
    <>
      <Flex w="100%" h="100%" px="6">
        <Box w="30%">
          <Heading as="h5" pb="2" size="sm">
            Navigation
          </Heading>
          <MenuItem pb="2" to="/#about">About</MenuItem>
          <MenuItem pb="2" to="/#projects">Projects</MenuItem>
          <MenuItem pb="2" to="/#skills">Skills</MenuItem>
          <MenuItem pb="2" to="/#experiences">Experiences</MenuItem>
          <MenuItem to="/posts">Posts</MenuItem>
        </Box>
        <Spacer />
        <Box w="60%">
          <Heading as="h5" pb="2" size="sm">
            Contact
          </Heading>
          <Text pb="2">Anoop K. chandran</Text>
          <Text pb="2">Affiliation: <Li href="https://www.fz-juelich.de/portal/DE/Home/home_node.html">Forschungszentrum Jülich</Li> </Text>
          <Text pb="5">Email: anoopkcn@gmail.com</Text>
          <SocialMedia color={mediaIconColor}/>
          <Box pt="5" color="gray.500">
            <Text fontSize="small">{siteConfig.copyright}</Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

function Footer(props) {
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <chakra.footer bg={bg} pt="20" pb="10" width="full" {...props}>
      <chakra.div mx="auto" maxW={{ base: "xl", md: "7xl" }}>
        <FooterContent />
      </chakra.div>
    </chakra.footer>
  );
}

export default Footer;
