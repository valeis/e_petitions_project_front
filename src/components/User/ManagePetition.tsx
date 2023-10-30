 import {

  Container,
  Flex,
  Heading,
  Stack, Text,
  VStack,
} from "@chakra-ui/react";


import {Layout, Loader} from "components";
import {useEffect, useState} from "react";
import { PetitionFormData} from "types";
import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {petitions} from "../../api";
 import {PetitionForm} from "../PetitionForm";

const initalState: PetitionFormData = {
  title: "",
  description: "",
  category: "",
  image:"",
  vote_goal: 0,
  checkedData: false,
  consentedData: false,
  exp_date:""
};
const CreatePetitionForm = ({
                              setIsSubmitted,
                              formData,
                              setFormData,
                              petitionID,
                              managePetition,
                            }: {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  formData: PetitionFormData;
  setFormData: React.Dispatch<React.SetStateAction<PetitionFormData>>;
  petitionID: string;
  managePetition: boolean
}) => {
  const [errors, setErrors] = useState(initalState);

  return (
    <>
      <Flex w={"full"} h="80px" bg="primary.600" color="white">
        <VStack w={"full"} justify={"center"} px={8}>
          <Stack w="full" maxW={"8xl"} align={"flex-start"} justifyContent="start" spacing={6}>
            <Heading as="h1" size="xl" my={4}>
              Administrati petiția #{petitionID}
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
          managePetition={managePetition}
        />
      </Container>
    </>
  );
};


export const ManagePetition = () => {
  const params = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const id = params.petitionId;

  const {data: data, isLoading, isSuccess} = useQuery({
    queryKey: ['petition', id],
    queryFn: async () => {
      return await petitions.getById(id as string);
    },
  });

  const petitionForm = data as PetitionFormData;

  const [formData, setFormData] = useState(initalState);

  useEffect(() => {
    if (isSuccess && data && typeof data === 'object') {
      setFormData(petitionForm);
    }
  }, [isSuccess, data]);

  if (!isSubmitted) {
    return (

      <Layout>
        {isLoading ? (
          <Flex w={"full"} h="100vh" justifyContent="center" mt={20} color="white">
            <Loader/>
          </Flex>
        ) : isSuccess ? (
          <CreatePetitionForm
            setIsSubmitted={setIsSubmitted}
            formData={formData}
            setFormData={setFormData}
            petitionID={`${id}`}
            managePetition={true}
          />

        ) : (
          <Text>Something went wrong</Text>
        )}
      </Layout>

    );

  }
};
