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
import { MenuItem } from "./elements";
import siteConfig from "../configs/site-config";
import { SocialMedia }  from '../components/elements'

function FooterContent() {
  const mediaIconColor=useColorModeValue("#363B72", "#ABACCA")
  return (
    <>
      <Flex w="100%" h="100%" px="6">
        <Box w="30%">
          <Heading as="h5" size="sm">
            Navigation
          </Heading>
          <MenuItem to="/#about">About</MenuItem>
          <MenuItem to="/#projects">Projects</MenuItem>
          <MenuItem to="/#skills">Skills</MenuItem>
          <MenuItem to="/#">Experiences</MenuItem>
          <SocialMedia color={mediaIconColor}/>
        </Box>
        <Spacer />
        <Box w="60%">
          <Heading as="h5" size="sm">
            Contact
          </Heading>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
          culpa voluptatum consequatur mollitia vitae, dolores amet obcaecati
          quae sapiente dolorum quisquam distinctio consectetur adipisci ipsa
          quod. Repellat nostrum reprehenderit aliquid!
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
