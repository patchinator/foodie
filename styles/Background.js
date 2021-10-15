import { Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";

const Background = (props) => {

  return (
    <Box
      bgGradient={useColorModeValue(
        "linear(to-r,green.300,white,green.300)",
        "linear(to-r,gray.800,gray.600,gray.800)"
      )}
      minH="max"
      position="fixed"
      width="100%"
      height="100%"
    >
      {props.children}
    </Box>
  );
};

export default Background;
