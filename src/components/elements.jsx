import { Link, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
import React from "react"
import { Box, Text } from "@chakra-ui/react"

// Switch between dark and light mode 
export function AccentSwitch() {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  return (
    <header>
      <IconButton
        onClick={toggleColorMode}
        aria-label="Theme Switch"
        icon={<SwitchIcon />
        }
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
  )
}

export const MenuItem = ({ children, to = "/", ...rest }) => {

  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  )
}