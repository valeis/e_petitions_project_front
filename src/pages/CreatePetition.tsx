import {
  Box,

  Button,
  Container,
  Flex,
  Heading,
  Stack, Text,
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
  image: "",
  vote_goal: 0,
  checkedData: false,
  consentedData: false,
  exp_date: ""
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
      <Container maxW="90%">
      <Box bgImage="url('src/data/images/yellow.png')" p={4} borderRadius="lg" mt={2}  >
        <Heading mx={4} my={4} color={"white"}>Creați o petiție </Heading>
      </Box>

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
