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
import { useState } from "react";
import { validateEmail, validatePassword, validateRepeatedPassword } from "./utils";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleClickPassword = () => setShow(!show);

  const [, setSignUpModalOpen] = useState(false);

  const register = useMutation(users.register, {
    onSuccess: () => {
      onClose();
    },
    onError: () => {
      toast({
        title: "Change your email",
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
        <ModalHeader m="auto">Înregistrează-te</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            register.mutate(values);
          }}
        >
          {(values) => (
            <Form>
              <ModalBody pb={6}>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }: any) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel>Adresă email</FormLabel>
                      <Input type="email" placeholder="prenume.nume@isa.utm.md" pr="4.5rem" {...field} />
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
                      <FormLabel>Confirmă parola</FormLabel>
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
                      <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <div style={{ textAlign: "center" }}>
                Deja ai cont?{" "}
                <a
                  onClick={() => {
                     onClose();
                  }}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer", // Set your desired text color
                    color:"#006AFF",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)", // Add text shadow
                  }}
                >
                  Loghează-te
                </a>
              </div>

              <ModalFooter display="flex" gap={4} justifyContent="center">
                <Button fontWeight="normal" onClick={onClose}>Anulare</Button>
                <Button
                  fontWeight="normal"
                  type="submit"
                  variant="solid"
                  width="35%"
                  color="white"
                  colorScheme="messenger"
                >
                  Înregistrare
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
