import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { GrStatusPlaceholderSmall } from "react-icons/gr";
import React from "react";
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

export const TitleTag = ({
  title,
  icon = GrStatusPlaceholderSmall,
  role = "",
  date = "",
  type = "",
  ...rest
}) => {
  const typeColor = useColorModeValue("#363971", "#ACACCA");
  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem colSpan={2}>
        <HStack>
          <Icon as={icon} display="block" w="5" h="5" />
          <Text as="b">{title}</Text>
        </HStack>
      </GridItem>
      <GridItem>
        <Box>
          <Text textAlign="right" color={typeColor}>
            {type}
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

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
          {data.meta.from} - {data.meta.to}
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
