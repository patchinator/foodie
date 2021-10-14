import { useContext } from "react";

import AuthContext from "../../store/auth-context";
import Link from "next/link";

import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, Text, UnorderedList, ListItem } from "@chakra-ui/layout";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/menu";
import {
  HamburgerIcon,
  MoonIcon,
  InfoOutlineIcon,
  CloseIcon,
  EditIcon,
  SettingsIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/color-mode";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const displayName = authCtx.displayName;

  const { colorMode, toggleColorMode } = useColorMode();

  const currentTime = new Date().getTime();
  const currentHours = new Date(currentTime).getHours();

  const displayTimeHandler = () => {
    if (currentHours >= 0 && currentHours < 12) {
      return "Good morning ";
    } else if (currentHours >= 12 && currentHours <= 17) {
      return "Good afternoon ";
    } else {
      return "Good evening ";
    }
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  // ---------------------------------------------------------------------------

  return (
    <Box>
      <Flex
        bg="facebook.400"
        p="2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          {/* <Image width="140" height="100" src={image} alt="foodie logo"></Image> */}
          <Text>TODO Foodie Logo</Text>
        </Box>
        <Box>
          <Flex justifyContent="space-evenly" alignItems="center">
            <UnorderedList
              listStyleType="none"
              display="flex"
              alignItems="center"
            >
              {!isLoggedIn && (
                <ListItem mr="2">
                  <Button>
                    <Link href="/auth/log-in">Login / Sign Up</Link>
                  </Button>
                </ListItem>
              )}
              {isLoggedIn && (
                <ListItem mr="2">
                  <Text fontSize="2xl">
                    {displayTimeHandler() + displayName}
                  </Text>
                </ListItem>
              )}
            </UnorderedList>
            <Menu>
              <MenuButton as={IconButton} icon={<HamburgerIcon w="6" h="6" />} />
              <MenuList listStyleType="none">
                <MenuItem
                  command={<EditIcon />}
                  cursor="pointer"
                  _hover={{ bg: "gray.600" }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  command={<SettingsIcon />}
                  cursor="pointer"
                  _hover={{ bg: "gray.600" }}
                >
                  Options
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  command={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  cursor="pointer"
                  _hover={{ bg: "gray.600" }}
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? "Nightmode" : "Lightmode"}
                </MenuItem>
                <MenuItem
                  command={<InfoOutlineIcon />}
                  cursor="pointer"
                  _hover={{ bg: "gray.600" }}
                >
                  About
                </MenuItem>
                {isLoggedIn && (
                  <MenuItem
                    command={<CloseIcon />}
                    cursor="pointer"
                    _hover={{ bg: "gray.600" }}
                    onClick={logoutHandler}
                  >
                    Sign Out
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
