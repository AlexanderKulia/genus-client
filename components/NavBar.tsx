import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FunctionComponent } from "react";
import { useAuth } from "../contexts/AuthContext";

const links = [
  { name: "Home", path: "/", auth: -1 },
  { name: "History", path: "/history", auth: 1 },
  { name: "Practice", path: "/practice", auth: 1 },
  { name: "Sign in", path: "/signin", auth: 0 },
  { name: "Sign up", path: "/signup", auth: 0 },
  { name: "Logout", path: "#", auth: 1 },
];

export const NAVBAR_HEIGHT = 64;

const NavBar: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, logOut } = useAuth();

  const renderNextLinks = () => {
    return links
      .filter((link) =>
        currentUser
          ? link.auth === -1 || link.auth === 1
          : link.auth === -1 || link.auth === 0
      )
      .map((link) => (
        <NextLink href={link.path} key={link.name} passHref>
          <Link
            _hover={{
              textDecoration: "none",
            }}
            onClick={link.name === "Logout" ? logOut : undefined}
          >
            {link.name}
          </Link>
        </NextLink>
      ));
  };

  return (
    <Box px={4} bg="gray.50">
      <Flex
        h={NAVBAR_HEIGHT / 4}
        alignItems="center"
        justifyContent={{ md: "center", base: "space-between" }}
      >
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
          {renderNextLinks()}
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {renderNextLinks()}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default NavBar;
