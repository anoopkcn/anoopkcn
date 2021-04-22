import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"

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
