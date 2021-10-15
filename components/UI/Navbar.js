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
import logo_black from "../../images/foodie_logo_black.png";
import logo_white from "../../images/foodie_logo_white.png";
import Image from "next/image";

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
        bg={colorMode === "light" ? "green.400" : "gray.700" }
        p="2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Flex justify="center" align="center">
            <Image
              width="250"
              height="75"
              src={colorMode === "light" ? logo_black : logo_white}
              alt="foodie logo"
            ></Image>
          </Flex>
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
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon w="6" h="6" />}
              />
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
