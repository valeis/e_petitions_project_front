
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
};
