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

  Box,
  VStack, Container, Grid,
} from "@chakra-ui/react";

import Select from "react-select";
import {IPetition, PetitionFormData} from "types";

import {useNavigate} from "react-router-dom";
import {useUser} from "../hooks";
import {useMutation} from "@tanstack/react-query";
import {petitions} from "../api";
import {DatePicker} from "antd";
import React, {useEffect, useState} from "react";

const categories = [
  {
    value: "educatie",
    label: "Educatie",
  },
  {
    value: "mediu",
    label: "Mediu",
  },
  {
    value: "infrastructura",
    label: "Infrastructura",
  },
  {
    value: "dezvoltare",
    label: "Dezvoltare regionala",
  },
  {
    value: "transport",
    label: "Transport",
  },
  {
    value: "energie",
    label: "Energie",
  },
  {
    value: "turism",
    label: "Turism",
  },
  {
    value: "drepturile_animalelor",
    label: "Drepturile animalelor",
  },
  {
    value: "tehnologie",
    label: "Tehnologie",
  },
  {
    value: "agricultura",
    label: "Agricultura",
  },
];

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
        user_id: parseInt(localStorage.getItem("userId")!, 10),
      }),
    onSuccess: (petition_id) => {
      navigate(`/petition/${petition_id}`);
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


  const [similar, setSimilar] = useState([]);
  const handleSimilar = async () => {
    try {
      const result = await petitions.getSimilar({ title: inputValue });
      setSimilar(result);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  useEffect(() => {
    handleSimilar();
  }, [inputValue]);

  const handleChangeAndSimilar = (e) => {
    handleChange(e);
    handleSimilar();
  };
    if (similar && similar.data && similar.data.petitions) {
        console.log("return", similar.data.petitions);
    }

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
          {/*  {MP && MP.map((petition: IPetition, index) => (*/}
          {/*    index > 0 &&*/}
          {/*    <Box key={index}>*/}
          {/*      <Text fontWeight={"bold"} mt={2}>*/}
          {/*        {petition.title}*/}
          {/*      </Text>*/}
          {/*      <Divider />*/}
          {/*    </Box>*/}
          {/*  ))}*/}



          </Box>
        </Container>
      </GridItem>
    </Grid>

  );
};
