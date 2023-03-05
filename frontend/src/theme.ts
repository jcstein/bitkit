import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Ubuntu', sans-serif`,
    body: `'Ubuntu Mono', monospace`,
  },
  components: {
    Link: {
      variants: {
        primary: ({ colorScheme = "orange" }) => ({
          color: `${colorScheme}.600`,
          _hover: {
            color: `${colorScheme}.800`,
          },
          _dark: {
            color: `${colorScheme}.200`,
            _hover: {
              color: `${colorScheme}.500`,
            },
          },
        }),
      },
      defaultProps: {
        variant: "primary",
      },
    },
  },
});

export default theme;