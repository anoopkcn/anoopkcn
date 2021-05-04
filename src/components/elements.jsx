import {
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { Box, Text } from "@chakra-ui/react";

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

export const MenuItem = ({ children, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

// Project section

export const ProjectItem = ({ data }) => {
  const bg = useColorModeValue("#A8C0D1", "#26476D");
  const typeColor = useColorModeValue("#363971", "#ACACCA");
  return (
    <GridItem p="5" bg={bg} borderRadius="3">
       <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
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
    {data.text}
    </GridItem>
  );
};

// Skills section
export const SkillsItem =({data}) =>{
  const bg = useColorModeValue("#A4BEB1", "#11515B");
  return (
    <GridItem p="5" bg={bg}  borderRadius="3">
        {data.text}   
    </GridItem>
  )
}

// experiances section
export const TimelineItem = ({ data }) => {
  const bg = useColorModeValue("#E9AA94", "#E36A41");
  return (
    <Box borderWidth="2px" borderRadius="lg" p="5" mt="5" mb="10">
      <Box position="relative">
        <Box
          position="absolute"
          top="-10"
          borderRadius="3"
          p="1"
          bg={bg}
          fontWeight="500"
        >
          {data.meta.from} <Icon as={FiMinus} w="5" h="5" /> {data.meta.to}
        </Box>
        <Box>{data.meta.place}</Box>
        <Box>{data.meta.position}</Box>
        <Box>{data.text}</Box>
        {data.meta.link && (
          <Link aria-label="institute-link" href={data.meta.link.url}>
            {data.meta.link.text}
          </Link>
        )}
      </Box>
    </Box>
  );
};
