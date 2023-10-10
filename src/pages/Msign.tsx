import { Button, Container, Image } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useUser } from "hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { petitions } from "api";

const user = {
  name: "Ion",
  surname: "Creangă",
  id: "123456789",
  location: "Chisinau",
  isResident: true,
  birthDate: new Date("1950-01-01"),
};

export const Msign = () => {
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const petitionId = params.get("petitionId");
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () =>
      petitions.sign({
        id: petitionId,
        semnat: `${user.name} ${user.surname}`,
      }),
    onSuccess: () => {
      navigate(`/petitions/${petitionId}`);
      queryClient.invalidateQueries(["petition", petitionId]);
    },
  });

  const handleClick = () => {
    mutate();
  };

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
        onClick={handleClick}
        mt={20}
      >
        Semnează petiția
      </Button>
    </Container>
  );
};
