import React from "react";
import { useViewportScroll } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { MenuItem } from "./elements";
import { Center, Divider, Flex, HStack } from "@chakra-ui/layout";
import {
  chakra,
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

function HeaderContent() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <>
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <HStack spacing="5"  display={["none","none","flex","flex"]}>
            <MenuItem to="/#about">About</MenuItem>
            <MenuItem to="/#projects">Projects</MenuItem>
            <MenuItem to="/#skills">Skills</MenuItem>
            <MenuItem to="/#experiences">Experiences</MenuItem>
            <Center height="2.0rem">
              <Divider orientation="vertical" />
            </Center>
            <MenuItem to="/posts">Posts</MenuItem>
          </HStack>

          {/* For mobile devices */}
          <HStack spacing="5" display={["flex","flex","none","none"]} >
            <MenuItem to="/#about">Home</MenuItem>
            <Center height="2.0rem">
              <Divider orientation="vertical" />
            </Center>
            <MenuItem to="/posts">Posts</MenuItem>
          </HStack>

        </Flex>

        <Flex
          justify="flex-end"
          w="100%"
          maxW="824px"
          align="center"
          color="gray.400"
        >
          <Tooltip label="Switch light/dark mode" fontSize="small">
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
}

function Header(props) {
  const bg = useColorModeValue("white", "gray.800");
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? "sm" : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="-1"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      width="full"
      {...props}
    >
      <chakra.div height={{base:"auto", md:"4.5rem"}} mx="auto" maxW={{ base: "xl", md: "7xl" }}>
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  );
}

export default Header;
