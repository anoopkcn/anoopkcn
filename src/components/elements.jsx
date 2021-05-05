import {
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Link as CLink,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { Box, Text } from "@chakra-ui/react";
import { HashLink as Link } from 'react-router-hash-link';

// Switch between dark and light mode
export function AccentSwitch() {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  return (
    <header>
      <IconButton
        onClick={toggleColorMode}
        aria-label="Theme Switch"
        icon={<SwitchIcon />}
      />
    </header>
  );
}

// Logo  component
export function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold">
        Logo
      </Text>
    </Box>
  );
}

export const MenuItem = ({ children, to = "/", hash="", ...rest }) => {
  return (
    <Link to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

export const ItemHead = ({ data }) => {
  const typeColor = useColorModeValue("#363971", "#ACACCA");
  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
      mb="2"
    >
      <GridItem colSpan={2}>
        <HStack>
          <Icon as={data.icon} display="block" w="5" h="5" />
          <Text as="b">{data.title}</Text>
        </HStack>
      </GridItem>
      <GridItem>
        <Box>
          <Text textAlign="right" color={typeColor}>
            {data.type}
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

// Project section

export const ProjectItem = ({ data }) => {
  const bg = useColorModeValue("#A8C0D1", "#26476D");
  return (
    <GridItem p="5" bg={bg} borderRadius="3">
      <ItemHead data={data} />
      <Box mt="2">{data.text}</Box>
    </GridItem>
  );
};

// Skills section
export const SkillsItem = ({ data }) => {
  const bg = useColorModeValue("#A4BEB1", "#11515B");
  return (
    <GridItem p="5" bg={bg} borderRadius="3">
      <ItemHead data={data} />
      <Box mt="2">{data.text}</Box>
    </GridItem>
  );
};

// experiances section
export const TimelineItem = ({ data }) => {
  const bg = useColorModeValue("#E9AA94", "#E36A41");
  return (
    <Box borderWidth="2px" borderRadius="lg" p="5" mt="5" mb="10">
      <Box position="relative">
        <Box
          position="absolute"
          top="-10"
          borderWidth="2px"
          borderRadius="4"
          p="1"
          bg={bg}
          fontWeight="400"
        >
          {data.meta.from} <Icon as={FiMinus} w="5" h="5" /> {data.meta.to}
        </Box>
        <Flex>
          <Box w="85%" mt="2">
            <Box fontWeight="500" fontSize="large" color="#B72C31">
              {data.meta.place}
            </Box>
            <Box fontWeight="500">{data.meta.icon && <Icon as={data.meta.icon} w="7" h="7" />} {data.meta.position}</Box>
            <Box pb="3" fontStyle="italic" color="gray.500">
              {data.meta.address}
            </Box>
            {data.text}
          </Box>
          <Spacer />
          <Center w="10%" p="3" borderRadius="8" bg="white">
            <Box>
              <CLink
                isExternal
                aria-label={data.meta.link.text}
                href={data.meta.link.url}
              >
                <Image src={data.meta.image} alt="image" />
              </CLink>
            </Box>
          </Center>
        </Flex>
      </Box>
    </Box>
  );
};
