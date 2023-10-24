import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
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
  import { useSearchParams } from "react-router-dom";
  import { validateEmail} from "./utils";
  
  interface OtpModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
  
    const toast = useToast();
  
    const sendOTP = useMutation(users.sendOTP, {
      onSuccess: async () => {
        onClose();
        toast({
            title: "Accesati link-ul transmis pe email",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
      },
      onError: () => {
        toast({
          title: "Verificati email-ul",
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
          <ModalHeader m="auto">Enter your email</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              email: email,
            }}
            onSubmit={(values) => {
              sendOTP.mutate(values);
              setEmail(email);
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
                </ModalBody>
                <ModalFooter display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="solid"
                    colorScheme="messenger"
                    width="35%"
                    color="white"
                    fontWeight="normal"
                    mr={4}
                  >
                    Send email
                  </Button>
                  <Button   fontWeight="normal" onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    );
  };
  