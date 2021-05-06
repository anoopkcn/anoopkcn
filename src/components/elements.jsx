import {
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  HStack,
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
import { HashLink as Link } from "react-router-hash-link";
import siteConfig from "../configs/site-config";
import { FaTwitter } from "react-icons/fa";
import { GrMail, GrInstagram } from "react-icons/gr";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneLight,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

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

export const Script = ({ language = "bash", code, number = true }) => {
  const bg = useColorModeValue(atomOneLight, atomOneDark);
  return (
    <Box my="5">
      <SyntaxHighlighter
        language={language}
        style={bg}
        showLineNumbers={number}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

const DiscordIcon = (props) => (
  <svg viewBox="0 0 146 146" {...props}>
    <path
      fill="currentColor"
      d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
      fillRule="nonzero"
    />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
    />
  </svg>
);

export const SocialMedia = ({ color }) => {
  return (
    <HStack spacing="5" color={color} display={{ base: "none", md: "flex" }}>
      <CLink isExternal aria-label="Email" href={siteConfig.author.mailto}>
        <Icon
          as={GrMail}
          display="block"
          transition="color 0.2s"
          w="5"
          h="5"
          _hover={{ color: "gray.600" }}
        />
      </CLink>
      <CLink isExternal aria-label="GitHub page" href={siteConfig.github.url}>
        <Icon
          as={GithubIcon}
          display="block"
          transition="color 0.2s"
          w="5"
          h="5"
          _hover={{ color: "gray.600" }}
        />
      </CLink>
      <CLink
        isExternal
        aria-label="Twitter page"
        href={siteConfig.author.twitter}
      >
        <Icon
          as={FaTwitter}
          display="block"
          transition="color 0.2s"
          w="5"
          h="5"
          _hover={{ color: "gray.600" }}
        />
      </CLink>
      <CLink aria-label="Discord page" href={siteConfig.discord.url}>
        <Icon
          as={DiscordIcon}
          display="block"
          transition="color 0.2s"
          w="5"
          h="5"
          _hover={{ color: "gray.600" }}
        />
      </CLink>
      <CLink
        isExternal
        aria-label="Instagram page"
        href={siteConfig.author.instagram}
      >
        <Icon
          as={GrInstagram}
          display="block"
          transition="color 0.2s"
          w="5"
          h="5"
          _hover={{ color: "gray.600" }}
        />
      </CLink>
    </HStack>
  );
};

export const MenuItem = ({ children, to = "/", hash = "", ...rest }) => {
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
    <Box
      borderWidth="2px"
      borderRadius="lg"
      borderColor="RGB(183, 44, 49, 0.2)"
      p="5"
      mt="5"
      mb="10"
    >
      <Box position="relative">
        <Box
          position="absolute"
          top="-10"
          borderWidth="1px"
          borderColor="RGB(183, 44, 49, 0.2)"
          borderRadius="4"
          p="1"
          bg={bg}
          fontWeight="400"
        >
          {data.meta.from} <Icon as={FiMinus} w="5" h="5" /> {data.meta.to}
        </Box>
        <Flex>
          <Box w="85%" mt="2">
            <Box fontWeight="500" fontSize="large" color="RGB(183, 44, 49)">
              {data.meta.place}
            </Box>
            <Box fontWeight="500">
              {data.meta.icon && <Icon as={data.meta.icon} w="7" h="7" />}{" "}
              {data.meta.position}
            </Box>
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
