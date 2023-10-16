/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input, NumberInput, NumberInputField,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Select from "react-select";
import { PetitionFormData } from "types";

import {useNavigate} from "react-router-dom";
import {useUser} from "../hooks";
import {useMutation} from "@tanstack/react-query";
import {petitions} from "../api";



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
  const { title, description, category, image, vote_goal} = formData;
  const navigate = useNavigate();
  // const { user } = useUser();


  const isSubmitDisabled =
    !title ||
    !description ||
    !vote_goal||
    !category.length ||
    !formData.checkedData ||
    !formData.consentedData;


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
      setErrors({ ...errors, title: "Titlul trebuie să aibă minim 10 caractere" });
    } else if (fieldName === "title" && value.length >= 10) {
      setErrors({ ...errors, title: "" });
    }


    if (fieldName === "description" && value.length < 100) {
      setErrors({ ...errors, content: "Conținutul trebuie să aibă minim 100 caractere" });
    }  else {
      setErrors({ ...errors, content: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} id="petitie-form">
      <VStack spacing={8} py={8} pb="200px">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Titlu</FormLabel>
          <Input
            type="text"
            placeholder="Titlu"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
          {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.content}>
          <FormLabel>Conținut</FormLabel>
          <Textarea
            placeholder="Conținut"
            name="description"
            value={description}
            onChange={handleChange}
            h="300px"
            maxLength={2000}
          />
          <FormErrorMessage>{errors.content}</FormErrorMessage>
        </FormControl>

        <HStack spacing={4} w="100%">
          <FormControl>
            <FormLabel>Categorie</FormLabel>
            <Select
              options={categories}
              value={categories.filter((option) => category.includes(option.value))}
              onChange={(option) =>
                setFormData({ ...formData, category: option ? option.value : '' })
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
              }}>

              <NumberInputField />
            </NumberInput>
          </FormControl>
        </HStack>

        <VStack w="full">
          <FormControl>
            <Checkbox
              name="checkedData"
              checked={formData.checkedData}
              onChange={(e) => setFormData({ ...formData, checkedData: e.target.checked })}
            >
              Am verificat datele introduse şi confirm corectitudinea lor, pe proprie răspundere*
            </Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox
              name="consentedData"
              checked={formData.consentedData}
              onChange={(e) => setFormData({ ...formData, consentedData: e.target.checked })}
            >
              În temeiul articolelor 6, 8, 9 ale Legii nr. 133 din 08.07.2011, îmi exprim
              consimţământul pentru prelucrarea datelor cu caracter personal care mă vizează în
              scopul procesării petiției.*
            </Checkbox>
          </FormControl>
        </VStack>

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
