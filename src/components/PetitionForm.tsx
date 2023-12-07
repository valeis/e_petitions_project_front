/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  Divider, GridItem,
  NumberInput,
  NumberInputField,
  Textarea,
  useToast,
  Stack,
  Badge,
  StackDivider,
  Heading,

  Box,
  VStack, Container, Grid,
} from "@chakra-ui/react";

import Select from "react-select";
import {IPetition, PetitionFormData} from "types";

import {useNavigate, Link} from "react-router-dom";
import {useUser} from "../hooks";
import {useMutation} from "@tanstack/react-query";
import {petitions} from "../api";
import {DatePicker} from "antd";
import React, {useEffect, useState} from "react";

const categories = [
  {
    value: "educatie",
    label: "Educație",
  },
  {
    value: "mediu",
    label: "Mediu",
  },
  {
    value: "camin",
    label: "Cămine",
  },
  {
    value: "decanat",
    label: "Decanat",
  },
  {
    value: "parcare",
    label: "Parcări",
  },
  {
    value: "probleme_interne",
    label: "Probleme interne",
  },
  {
    value: "evenimente",
    label: "Evenimente",
  },
  {
    value: "drepturile_studentilor",
    label: "Drepturile studenților",
  },
  {
    value: "tehnologie",
    label: "Tehnologie",
  },
  {
    value: "probleme_sociale",
    label: "Probleme sociale",
  },
];

type PetitionType = {
  petition_id: string; // Adjust the type accordingly
  title: string; // Adjust other properties accordingly
  // Add other properties as needed
};

interface PetitionFormProps {
  formData: PetitionFormData;
  setFormData: React.Dispatch<React.SetStateAction<PetitionFormData>>;
  errors: PetitionFormData;
  setErrors: React.Dispatch<React.SetStateAction<PetitionFormData>>;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PetitionForm = ({
                               formData,
                               setFormData,
                               errors,
                               setErrors,
                               setIsSubmitted,
                             }: PetitionFormProps) => {
  const {title, description, category, image, vote_goal, exp_date} = formData;
  const navigate = useNavigate();
  // const { user } = useUser();
  const toast = useToast();

  const isSubmitDisabled =
    !title ||
    !description ||
    !vote_goal ||
    !exp_date ||
    !category.length ||
    !formData.checkedData ||
    !formData.consentedData;

  const {mutate} = useMutation({
    mutationFn: () =>
      petitions.add({
        title,
        description,
        category,
        image,
        vote_goal,
        exp_date,
        user_id: localStorage.getItem("userId")
      }),
    onSuccess: (data) => {
      navigate(`/petition/${data}`);
      toast({
        title: "Petiția a fost trimisă.",
        description: "Mulțumim pentru implicarea ta!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSignClick = () => mutate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    setIsSubmitted(true);
  };
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormData({...formData, [fieldName]: value});

    if (fieldName === "title" && value.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Titlul trebuie să aibă minim 10 caractere",
      }));
    } else if (fieldName === "title" && value.length >= 10) {
      setErrors((prevErrors) => ({...prevErrors, title: ""}));
    }

    if (fieldName === "description" && value.length < 100) {
      setErrors({...errors, description: "Conținutul trebuie să aibă minim 100 caractere"});
    } else {
      setErrors({...errors, description: ""});
    }
    setInputValue(e.target.value);
  };

  const handleDateChange = (date: any) => {
    const formattedDate = date.toISOString();
      console.log(formattedDate)
    setFormData({...formData, exp_date: formattedDate});
  };


  const [similar, setSimilar] = useState<PetitionType[]>([]);
  const handleSimilar = async () => {
    try {
      const result = await petitions.getSimilar({ title: inputValue });
      setSimilar(result.data);
      console.log(result.data)
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  useEffect(() => {
    handleSimilar();
  }, [inputValue]);

  const handleChangeAndSimilar = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    handleSimilar();
  };

  return (
    <Grid templateColumns='repeat(6, 1fr)' gap={1} maxWidth={"100%"} >
      <GridItem colSpan={4} >
      <form onSubmit={handleSubmit} id="petitie-form">
        <VStack
          spacing={8}
          py={4}
          pb="200px"
          alignItems="center"
          justifyContent="center"
          style={{margin: "auto"}}
        >
          <VStack
            width="full"
            alignItems="center"
            justifyContent="center"
            style={{margin: "auto"}}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel>Titlu</FormLabel>
              <Input
                type="text"
                colorScheme="messenger"
                placeholder="Titlu"
                name="title"
                value={title}
                onChange={handleChangeAndSimilar}
                required
              />
              {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Conținut</FormLabel>
              <Textarea
                placeholder="Conținut"
                name="description"
                value={description}
                onChange={handleChange}
                h="160px"
                maxLength={2000}
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
          </VStack>
          <HStack spacing={4} w="100%">
            <FormControl>
              <FormLabel>Categorie</FormLabel>
              <Select
                options={categories}
                value={categories.filter((option) => category.includes(option.value))}
                onChange={(option) =>
                  setFormData({...formData, category: option ? option.value : ""})
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Vote Goal</FormLabel>
              <NumberInput
                defaultValue={0}
                onChange={(valueString) => {
                  const newValue = parseInt(valueString, 10);
                  setFormData({...formData, vote_goal: newValue});
                }}
              >
                <NumberInputField/>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Data expirării</FormLabel>
              <DatePicker style={{width: "100%", height: "40px"}} onChange={handleDateChange}/>
            </FormControl>
          </HStack>

          <VStack w="full">
            <FormControl>
              <Checkbox colorScheme="messenger"
                        name="checkedData"
                        checked={formData.checkedData}
                        onChange={(e) => setFormData({...formData, checkedData: e.target.checked})}
              >
                Am verificat datele introduse şi confirm corectitudinea lor, pe proprie răspundere*
              </Checkbox>
            </FormControl>
            <FormControl>
              <Checkbox
                colorScheme="messenger"
                name="consentedData"
                checked={formData.consentedData}
                onChange={(e) => setFormData({...formData, consentedData: e.target.checked})}
              >
                În temeiul articolelor 6, 8, 9 ale Legii nr. 133 din 08.07.2011, îmi exprim
                consimţământul pentru prelucrarea datelor cu caracter personal care mă vizează în
                scopul procesării petiției.*
              </Checkbox>
            </FormControl>
          </VStack>
          <Button
            type="submit"
            colorScheme="messenger"
            w="full"
            size="lg"
            borderRadius={"full"}
            fontSize={16}
            fontWeight="normal"
            mr={13}
            isDisabled={isSubmitDisabled}
            onClick={handleSignClick}
            form="petitie-form"
          >
            Trimite petiția
          </Button>
        </VStack>
      </form>
      </GridItem>
      <GridItem colStart={5} colEnd={7}>
        <Container  py={"4"} maxWidth={"md"}>
          <Text mb={"2"}>See similar petitions in here:</Text>
          <Box borderRadius="md" p={4} borderWidth="1px" h = {"60vh"} maxW="xl">
          
          {similar && similar.length > 0 ? (
            <Stack divider={<StackDivider />} spacing='4'>
              {similar.map((petition, petition_id) => (
                <Link key={petition_id} to={`/petition/${petition.petition_id}`}>
                  <HStack>
                  <Badge colorScheme='green'>104</Badge>
                  <Box>
                    <Text size='sm' transition="all 0.2s" _hover={{ color: "grey" }}>{petition.title}</Text>
                  </Box>
                  </HStack>
                </Link>
              ))}
            </Stack>
          ) : (
            <Box textAlign="center">
              <Text>No petitions found.</Text>
            </Box>
          )}
          </Box>
        </Container>
      </GridItem>
    </Grid>

  );
};
