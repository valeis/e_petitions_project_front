
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "hooks";
import React from "react";

const user = {
  name: "Ion",
  surname: "Creangă",
  id: "123456789",
  locatie: "mun. Chișinău",
  location: "mun. Chișinău, Republica Moldova",
  isResident: true,
  birthDate: new Date("1950-01-01"),
};

export const Mpass = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const petitionId = params.get("petitionId");
  const createPetition = params.get("createPetition");


  const handleClick = () => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    if (petitionId !== null) {
      navigate(`/petitions/${petitionId}`);
    } else if (createPetition !== null) {
      navigate("/petitions/create");
    } else {
      navigate("/");
    }
  };

  return (
    {/* <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" p="5">
        Sign in{" "}
      </Heading>

      <Stack spacing={4}>
        <Input placeholder="Email" pr="4.5rem" />
        <InputGroup>
          <InputGroup>
            <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password" />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </InputGroup>

        <Button borderRadius={5} type="submit" variant="solid" bg="primary.600" width="50%" m="auto" color="white" >
          Login
        </Button>

      </Stack>
    </Flex> */}
  );
};
