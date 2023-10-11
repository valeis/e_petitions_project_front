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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  ModalFooter,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "hooks";
import logo from "../../public/utm-logo.svg";


export const Header = () => {
  const { user, setUser } = useUser();
  7;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClickPassword = () => setShow(!show);

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
              <ChakraLink
                href="https://utm.md/"
                fontSize="sm"
                display="flex"
                alignItems="center"
              >
                <Image
                  src={logo}
                  boxSize="30px"
                  mr="0.5rem"
                />
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
                        {user.name} {user.surname}
                      </Text>
                    </Link>
                    <Box width="1px" height="20px" backgroundColor="gray.200" marginX="0.5rem" />
                    <Button
                      size="sm"
                      variant="link"
                      color="black"
                      fontSize="sm"
                      fontWeight="light"
                      onClick={() => setUser(null)}
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
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Coat_of_arms_of_Moldova.svg/640px-Coat_of_arms_of_Moldova.svg.png"
                  alt="Site Logo"
                  width="70px"
                  height="70px"
                />
                <Box marginLeft="1rem" fontFamily="inherit" fontSize="18px" paddingTop="1rem">
                  <Text fontSize="2xl" as="b">
                    PETIŢII ELECTRONICE
                  </Text>
                  <Text fontSize="smaller">Reprezentanţa oficială online a Preşedenţiei RM</Text>
                  <br />
                </Box>
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
            <Link to={user ? "/petitions/create" : "/mpass?createPetition"}>
              <Button
                width="auto"
                gap={4}
                marginX="auto"
                rounded="full"
                fontWeight="bold"
                colorScheme="blue"
                size="lg"
              >
                Creaţi o petiţie
                <FaPlus />
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="auto">Sign in</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Your email</FormLabel>
              <Input placeholder="name@isa.utm.md" pr="4.5rem" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="••••••••" />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
            <div style={{ textAlign: "center"}}>
              Don't have an account yet? <a>Sing Up</a>
            </div>
          <ModalFooter m="auto">
            <Button
              borderRadius={5}
              type="submit"
              variant="solid"
              bg="primary.600"
              width="50%"
              color="white"
              mr={4}
            >
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
