import { IconButton, Flex, HStack } from "@chakra-ui/react";
import { FaMoon, FaSun, FaGithub } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Topbuttons = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex align="center" justify="end">
      <HStack pt="3" pr="5">
      <ConnectButton />
      <IconButton
          onClick={() => window.open("https://github.com/rollkit/bitkit", "_blank")}
        aria-label={`Switch from ${colorMode} mode`} size="sm"
        >
          {<FaGithub />}
        </IconButton>
        <IconButton
          onClick={toggleColorMode}
          aria-label={`Switch from ${colorMode} mode`} size="sm"
        >
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </IconButton>
      </HStack>
    </Flex>
  );
};