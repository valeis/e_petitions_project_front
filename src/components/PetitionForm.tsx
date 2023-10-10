/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Select from "react-select";
import { PetitionFormData } from "types";
import { regions as regionOptions } from "data/regions.json";

import wash from "washyourmouthoutwithsoap";

const toWhoOptions = [
  { value: "guvern", label: "Guvern" },
  { value: "parlament", label: "Parlament" },
  { value: "presedinte", label: "Președinte" },
  { value: "primar", label: "Primar" },
];

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
  const { name, content, category, locatie, toWho } = formData;

  const isSubmitDisabled =
    !name ||
    !content ||
    !category.length ||
    !toWho ||
    ((toWho === "primar" || toWho === "otherValueRequiringRegion") && !locatie) ||
    !formData.checkedData ||
    !formData.consentedData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "name" && e.target.value.length < 10) {
      setErrors({ ...errors, name: "Titlul trebuie să aibă minim 10 caractere" });
    }

    if (e.target.name === "name" && e.target.value.length >= 10) {
      setErrors({ ...errors, name: "" });
    }

    const isProfane = wash.check("ro", e.target.value);

    if (e.target.name === "content" && e.target.value.length < 100) {
      setErrors({ ...errors, content: "Conținutul trebuie să aibă minim 100 caractere" });
    } else if (isProfane) {
      setErrors({ ...errors, content: "Conținutul petiției conține cuvinte obscene" });
    } else {
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
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.content}>
          <FormLabel>Conținut</FormLabel>
          <Textarea
            placeholder="Conținut"
            name="content"
            value={content}
            onChange={handleChange}
            h="300px"
            maxLength={2000}
          />
          <FormErrorMessage>{errors.content}</FormErrorMessage>
        </FormControl>

        <HStack justifyContent="space-between" alignItems="start" w="full" spacing={8}>
          <FormControl>
            <FormLabel>Destinatar</FormLabel>
            <Select
              options={toWhoOptions}
              value={toWhoOptions.find((option) => option.label === toWho)}
              onChange={(option) =>
                setFormData({ ...formData, toWho: option ? option.label : "", locatie: undefined })
              }
            />
            {errors.toWho && <FormErrorMessage>{errors.toWho}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.locatie}>
            <FormLabel>Regiune</FormLabel>
            <Select
              options={regionOptions}
              isDisabled={toWho !== "Primar"}
              value={
                toWho === "Primar" ? regionOptions.find((option) => option.label === locatie) : null
              }
              onChange={(option) => {
                setFormData({ ...formData, locatie: option ? option.label : "" });
                setErrors({
                  ...errors,
                  locatie:
                    option?.label !== "mun. Chişinău"
                      ? "Localitatea nu corespunde domiciliului dvs."
                      : "",
                });
              }}
            />
            {locatie === "mun. Chişinău" && (
              <FormHelperText>
                Numărul minim de semnături pentru petiții adresate primarului mun. Chișinău este de
                5351.
              </FormHelperText>
            )}
            {errors.locatie && <FormErrorMessage>{errors.locatie}</FormErrorMessage>}
          </FormControl>
        </HStack>
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
          form="petitie-form"
        >
          Trimite petiția
        </Button>
      </VStack>
    </form>
  );
};
