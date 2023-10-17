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
        <ModalHeader m="auto">Sign up</ModalHeader>
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
                     onClose();
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
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
