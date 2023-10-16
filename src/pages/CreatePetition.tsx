import {

  Button,
  Container,
  Flex,
  Heading,
  Stack,
  VStack,
  Image,
} from "@chakra-ui/react";


import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { petitions } from "api";

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

const CreatePetitionSubmitted = ({ formData }: { formData: PetitionFormData }) => {
  const navigate = useNavigate();
  const { title, description, category, image, vote_goal} = formData;

  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: () =>
      petitions.add({
        title,
        description,
        category,
        image,
        vote_goal,
        user_id: 3,
      }),
    onSuccess: (petition_id) => {
      navigate(`/petitions/${petition_id}`);

    },
  });

  const handleSignClick = () => mutate();

  return (
    <Container
      maxW="8xl"
      py={20}
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Image src="https://msign.gov.md/images/msign-logo.png" w="50%" marginX="auto" />
      <Button
        size="lg"
        colorScheme="purple"
        marginX="auto"
        display="block"
        onClick={handleSignClick}
        mt={20}
      >
        Creati petiția
      </Button>
    </Container>
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

  return <CreatePetitionSubmitted formData={formData} />;
};
