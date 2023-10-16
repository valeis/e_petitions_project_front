import {

  Button,
  Container,
  Flex,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react";


import { Layout, PetitionForm } from "components";
import { useUser } from "hooks";
import { useState } from "react";
import { PetitionFormData } from "types";
import React from "react";

const initalState: PetitionFormData = {
  title: "",
  description: "",
  category: "",
  image:"",
  vote_goal: 0,
  checkedData: false,
  consentedData: false,
};

const CreatePetitionForm = ({
  setIsSubmitted,
  formData,
  setFormData,
}: {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  formData: PetitionFormData;
  setFormData: React.Dispatch<React.SetStateAction<PetitionFormData>>;
}) => {
  const [errors, setErrors] = useState(initalState);

  return (
    <Layout>
      <Flex w={"full"} h="200px" bg="primary.600" color="white">
        <VStack w={"full"} justify={"center"} px={8}>
          <Stack w="full" maxW={"8xl"} align={"flex-start"} justifyContent="start" spacing={6}>
            <Heading as="h1" size="2xl" my={4}>
              Creați o petiție
            </Heading>
          </Stack>
        </VStack>
      </Flex>
      <Container maxW="8xl">
        <PetitionForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          setIsSubmitted={setIsSubmitted}
        />
      </Container>
    </Layout>
  );
};


export const CreatePetition = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(initalState);

  if (!isSubmitted) {
    return (
      <CreatePetitionForm
        setIsSubmitted={setIsSubmitted}
        formData={formData}
        setFormData={setFormData}
      />
    );
  }


};
