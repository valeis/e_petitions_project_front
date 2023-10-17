import {
  Text,
  Button,
  Container,
  Box,
  Flex,
  Grid,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
  Image,
  HStack,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "hooks";
import headerLogo from "../../public/utm-logo.svg";
import heroLogo from "../../public/Logo_inscript_horizontal-fcim-m.png";
import { LoginModal } from "components/Auth/LoginModal";

export const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSubmit = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", term);
    setSearchParams(params.toString());
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <>
      <Box w="full" borderBottomWidth="1px">
        <Container maxW={{ sm: "6xl", "2xl": "8xl" }} px={0}>
          <Grid templateColumns="repeat(16, 1fr)" gap={4} w="full">
            <Box
              gridColumn="span 16"
              sx={{ display: "center" }}
              justifyContent="center"
              borderBottomWidth="1px"
              borderBottomLeftRadius="lg"
              borderRightWidth="1px"
              borderBottomRightRadius="lg"
              borderLeftWidth="1px"
              width="auto"
              padding="1.5"
            >
              <ChakraLink href="https://utm.md/" fontSize="sm" display="flex" alignItems="center">
                <Image src={headerLogo} boxSize="30px" mr="0.5rem" />
                Site-ul oficial al Universității Tehnice al Moldovei
              </ChakraLink>
              <Flex marginLeft="auto" alignItems="center" paddingRight="1rem">
                <Button
                  size="sm"
                  as="a"
                  href="#"
                  variant="link"
                  color="black"
                  fontSize="sm"
                  fontWeight="light"
                >
                  EN
                </Button>
                <Box width="1px" height="20px" backgroundColor="gray.200" marginX="0.5rem" />
                <Button
                  size="sm"
                  as="a"
                  href="#"
                  variant="link"
                  color="black"
                  fontSize="sm"
                  fontWeight="light"
                >
                  Ajutor
                </Button>
                <Box width="1px" height="20px" backgroundColor="gray.200" marginX="0.5rem" />
                {user ? (
                  <HStack spacing={2}>
                    <Link to="/profile">
                      <Text
                        fontSize="sm"
                        fontWeight="light"
                        _hover={{ textDecoration: "underline" }}
                      >
                        {user.email}
                      </Text>
                    </Link>
                    <Box width="1px" height="20px" backgroundColor="gray.200" marginX="0.5rem" />
                    <Button
                      size="sm"
                      variant="link"
                      color="black"
                      fontSize="sm"
                      fontWeight="light"
                      onClick={() => {
                        setUser(null);
                        sessionStorage.removeItem("user");
                      }}
                    >
                      Ieșire
                    </Button>
                  </HStack>
                ) : (
                  <Button onClick={onOpen} variant="link" color="black">
                    <Text fontSize="sm" fontWeight="light">
                      Autentificare
                    </Text>
                  </Button>
                )}
              </Flex>
            </Box>
          </Grid>

          <LoginModal isOpen={isOpen} onClose={onClose} />

          <Flex
            alignItems="center"
            w="full"
            paddingTop="0.5rem"
            justifyContent="space-between"
            paddingBottom="0.5rem"
            px={0}
          >
            <Link to="/">
              <HStack role="group" spacing={4}>
                <img src={heroLogo} alt="Site Logo" width="270px" />
              </HStack>
            </Link>

            <Flex alignItems="center" paddingRight="0rem">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(searchTerm);
                }}
              >
                <InputGroup size="lg" w="550px">
                  <Input
                    placeholder="Căutaţi petiţia"
                    rounded="full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      colorScheme="blue"
                      aria-label="Search database"
                      rounded="full"
                      icon={<SearchIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </form>
            </Flex>
            <Button
              width="auto"
              gap={4}
              marginX="auto"
              rounded="full"
              fontWeight="bold"
              colorScheme="blue"
              size="lg"
              onClick={() => {
                user ? navigate("/petitions/create") : onOpen();
                // navigate("/petitions/create") ;
              }}
            >
              Creaţi o petiţie
              <FaPlus />
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
};
