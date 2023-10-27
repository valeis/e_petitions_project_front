import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { users } from "api";
import { Field, Form, Formik } from "formik";
import { useUser } from "hooks";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RegisterModal } from "./RegisterModal";
import { validateEmail, validatePassword } from "./utils";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const petitionId = params.get("petitionId");
  const createPetition = params.get("createPetition");
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleClickPassword = () => setShow(!show);

  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  const login = useMutation(users.login, {
    onSuccess: async (data) => {
      onClose();
      const accessToken = data['access-token'];
      const refreshToken = data['refresh-token'];
      const userId = data['userId'];

      localStorage.setItem("user", JSON.stringify({ email, userId }));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);

      setUser(user);
      if (petitionId !== null) {
        navigate(`/petitions/${petitionId}`);
      } else if (createPetition !== null) {
        navigate("/petitions/create");
      }
      window.location.reload();
    },
    onError: () => {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader m="auto">Loghează-te</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            email: email,
            password: password,
          }}
          onSubmit={(values) => {
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
                      <FormLabel>Adresă email</FormLabel>
                      <Input type="email" placeholder="name@isa.utm.md" pr="4.5rem" {...field} />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password" validate={validatePassword}>
                  {({ field, form }: any) => (
                    <FormControl mt={4} isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel>Parola</FormLabel>
                      <InputGroup>
                        <Input
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <InputRightElement width="4.5rem">
                          <Button fontWeight="normal" h="1.75rem" size="sm" onClick={handleClickPassword}>
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <div style={{ textAlign: "center" }}>
                Încă nu ai cont?{" "}
                <a
                  onClick={() => {
                    setSignUpModalOpen(true);
                  }}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer", // Set your desired text color
                    color:"#006AFF",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)", // Add text shadow
                  }}
                >
                Înregistrează-te
                </a>
                <RegisterModal
                  isOpen={isSignUpModalOpen}
                  onClose={() => {
                    setSignUpModalOpen(false);
                  }}
                />
              </div>
              <ModalFooter display="flex" gap={4} justifyContent="center">
                <Button fontWeight="normal" onClick={onClose}>Anulare</Button>
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="messenger"
                  width="35%"
                  color="white"
                  fontWeight="normal"
                >
                  Autentificare
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
