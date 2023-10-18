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
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChevronLeftIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "hooks";
import headerLogo from "../../public/E-Petiții.svg";
import heroLogo from "../../public/Logo_inscript_horizontal-fcim-m.png";
import { LoginModal } from "components/Auth/LoginModal";

export const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();


  // const { isSearchOpen, onSearchOpen, onSearchClose } = useDisclosure();

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
              width="auto"
              padding="6"
            >
              <Flex alignItems="center" gap={55}>
                <Link to="/">
                  <HStack role="group" spacing={4}>
                    <Image src={headerLogo} width="96px" height="27" mr="0.5rem" />
                  </HStack>
                </Link>
                  <ChakraLink href="https://utm.md/" fontSize="sm" display="flex" gap={55} alignItems="center">
                    Site-ul oficial al Universității Tehnice al Moldovei
                  </ChakraLink>
              </Flex>
              <Flex marginLeft="auto" alignItems="center" paddingRight="1rem">
                <Box 
                  as="button"
                  fontSize="12px"
                  backgroundColor="gray.200"
                  textColor="gray.500"
                  rounded="full"
                  px="15px"
                  py="5px"
                  marginRight="5px"
                  onClick={onSearchOpen}
                  display="flex"
                  alignItems="center"
                  gap="7px"
                >
                  <SearchIcon />
                  Find petition
                </Box>
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
                  EN
                </Button>
                /
                <Button
                  size="sm"
                  as="a"
                  href="#"
                  variant="link"
                  color="black"
                  fontSize="sm"
                  fontWeight="light"
                >
                  RO
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

          <Modal isOpen={isSearchOpen} onClose={onSearchClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="10px"
                  width="full"
                >
                  <Box as="button" onClick={onSearchClose} textColor="gray.500">
                    <ChevronLeftIcon width="30px" height="30px" />
                  </Box>
                  <form 
                    style={{ width: '100%' }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(searchTerm);
                    }}
                  >
                    <InputGroup>
                      <Input
                        variant="unstyled" 
                        placeholder="Search by name, category..."
                        _placeholder={{fontFamily: "Inter", fontSize: "14px", color: "gray.500"}}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <InputRightElement width="auto" height="auto">
                        <Box as="button" textColor="gray.500" type="submit">
                          <Search2Icon />
                        </Box>
                      </InputRightElement>
                    </InputGroup>
                  </form>
                </Box>
                {/* <Box width="100%" height="1px" backgroundColor="gray.200"/> */}
              </ModalHeader>
              <ModalBody>
                modal body
              </ModalBody>
            </ModalContent>
          </Modal>


          {/* <Flex
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
          </Flex> */}
        </Container>
      </Box>
    </>
  );
};
