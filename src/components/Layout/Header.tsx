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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "hooks";
import { users } from "api/users";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, FormikContextType } from "formik";
import headerLogo from "../../public/utm-logo.svg";
import heroLogo from "../../public/Logo_inscript_horizontal-fcim-m.png"


export const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClickPassword = () => setShow(!show);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  const [params] = useSearchParams();
  const petitionId = params.get("petitionId");
  const createPetition = params.get("createPetition");

  const toast = useToast()

  const login = useMutation(users.login, {
    onSuccess: () => {
      onClose();
      sessionStorage.setItem("user", JSON.stringify({ email }));
      setUser(user);
      if (petitionId !== null) {
        navigate(`/petitions/${petitionId}`);
      } else if (createPetition !== null) {
        navigate("/petitions/create");
      }
      window.location.reload();
    },
    onError: ()=>{
      toast({
        title: 'Invalid credentials',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  });

  const register = useMutation(users.register, {
    onSuccess: () => {
      setSignUpModalOpen(false);
    },
    onError: ()=>{
      toast({
        title: 'Change your email',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  });

  function validateEmail(email: string) {
    let error;

    const emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,}|[A-Z0-9.-])+\.utm\.md$/i;



    if (!email) {
      error = "Email is required";
    } else if (!emailRegex.test(email)) {
      error = "Invalid email address";
    }
    return error;
  }

  function validatePassword(password: string) {
    let error;

    if (!password) {
      error = "Password is required";
    } else if (password.length < 8) {
      error = "Password must be 8 characters long";
    }
    return error;
  }

  function validateRepeatedPassword(pass: string, value: string) {
    let error;
    console.log(pass, value);
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password must be 8 characters long";
    } else if (pass !== value) {
      error = "Passwords don't match";
    }
    console.log(error);
    return error;
  }

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
                  src={headerLogo}
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
                  src={heroLogo}
                  alt="Site Logo"
                  width="270px"
                  // height="70px"
                />
                {/* <Box marginLeft="1rem" fontFamily="inherit" fontSize="18px" paddingTop="1rem">
                  <Text fontSize="2xl" as="b">
                    PETIŢII ELECTRONICE
                  </Text>
                  <Text fontSize="smaller">Reprezentanţa oficială online a Preşedenţiei RM</Text>
                  <br />
                </Box> */}
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
                navigate("/petitions/create") ;
              }}
            >
              Creaţi o petiţie
              <FaPlus />
            </Button>
          </Flex>
        </Container>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="auto">Sign in</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              email: email,
              password: password,
            }}
            onSubmit={(values, { resetForm }) => {
              login.mutate(values);
              setEmail(values.email);
              setPassword(values.password);
            }}
          >
            {(props) => (
              <Form>
                <ModalBody pb={6}>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel>Your email</FormLabel>
                        <Input type="email" placeholder="name@isa.utm.md" pr="4.5rem" {...field} />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                              {show ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <div style={{ textAlign: "center" }}>
                  Don't have an account yet?{" "}
                  <a
                    onClick={() => {
                      setSignUpModalOpen(true);
                    }}
                    style={{
                      textDecoration: "none",
                      cursor: "pointer", // Set your desired text color
                      color: "#2B6CB0",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.1)", // Add text shadow
                    }}
                  >
                    Sing Up
                  </a>
                </div>
                <ModalFooter display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="solid"
                    bg="primary.600"
                    width="35%"
                    color="white"
                    mr={4}
                  >
                    Login
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSignUpModalOpen} onClose={() => setSignUpModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="auto">Sign up</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { resetForm }) => {
              register.mutate(values);
            }}
          >
            {(values) => (
              <Form>
                <ModalBody pb={6}>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel>Your email</FormLabel>
                        <Input type="email" placeholder="name@isa.utm.md" pr="4.5rem" {...field} />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                              {show ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field
                    name="confirmPassword"
                    validate={(value: string) =>
                      validateRepeatedPassword(values.values.password, value)
                    }
                  >
                    {({ field, form }: any) => (
                      <FormControl
                        mt={4}
                        isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}
                      >
                        <FormLabel>Confirm password</FormLabel>
                        <InputGroup>
                          <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                              {show ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <div style={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <a
                    onClick={() => {
                      setSignUpModalOpen(false); // Close the second modal
                    }}
                    style={{
                      textDecoration: "none",
                      cursor: "pointer", // Set your desired text color
                      color: "#2B6CB0",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.1)", // Add text shadow
                    }}
                  >
                    Sign In
                  </a>
                </div>
                <ModalFooter display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="solid"
                    bg="primary.600"
                    width="35%"
                    color="white"
                    mr={4}
                  >
                    Register
                  </Button>
                  <Button onClick={() => setSignUpModalOpen(false)}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
