/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";

import Select from "react-select";
import { PetitionFormData } from "types";

import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks";
import { useMutation } from "@tanstack/react-query";
import { petitions } from "../api";
import { DatePicker } from "antd";

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

export const PetitionUpdateForm = ({
                               formData,
                               setFormData,
                               errors,
                               setErrors,
                               setIsSubmitted,
                             }: PetitionFormProps) => {
  const { title, description, category, image, vote_goal, exp_date } = formData;
  const navigate = useNavigate();
  const toast = useToast();

  const isSubmitDisabled =
    !title ||
    !description ||
    !vote_goal ||
    !exp_date ||
    !category.length


  const { mutate } = useMutation({
    mutationFn: () =>
      petitions.update({
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
        title: "Petiția a fost schimbata.",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [fieldName]: value });

    if (fieldName === "title" && value.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Titlul trebuie să aibă minim 10 caractere",
      }));
    } else if (fieldName === "title" && value.length >= 10) {
      setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
    }

    if (fieldName === "description" && value.length < 100) {
      setErrors({ ...errors, description: "Conținutul trebuie să aibă minim 100 caractere" });
    } else {
      setErrors({ ...errors, description: "" });
    }
  };

  const handleDateChange = (date: any) => {
    const formattedDate = date.toISOString();
    setFormData({ ...formData, exp_date: formattedDate });
  };

  return (
    <form onSubmit={handleSubmit} id="petitie-form">
      <VStack
        spacing={8}
        py={4}
        pb="200px"
        width="70%"
        alignItems="center"
        justifyContent="center"
        style={{ margin: "auto" }}
      >
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>Titlu</FormLabel>
          <Input
            type="text"
            placeholder="Titlu"
            name="title"
            value={title}
            onChange={handleChange}
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

        <HStack spacing={4} w="100%">
          <FormControl>
            <FormLabel>Categorie</FormLabel>
            <Select
              options={categories}
              value={categories.filter((option) => category.includes(option.value))}
              onChange={(option) =>
                setFormData({ ...formData, category: option ? option.value : "" })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Vote_goal</FormLabel>
            <NumberInput
              defaultValue={0}
              onChange={(valueString) => {
                const newValue = parseInt(valueString, 10);
                setFormData({ ...formData, vote_goal: newValue });
              }}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Data expirării</FormLabel>
            <DatePicker style={{ width: "100%", height: "40px" }} onChange={handleDateChange} />
          </FormControl>
        </HStack>

        <Button
          type="submit"
          colorScheme="blue"
          w="full"
          isDisabled={isSubmitDisabled}
          onClick={handleSignClick}
          form="petitie-form"
        >
          Trimite petiția
        </Button>
      </VStack>
    </form>
  );
};
