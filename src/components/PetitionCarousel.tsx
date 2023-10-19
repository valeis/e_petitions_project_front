import React, { useState } from "react";
import { PetitionCard } from "./PetitionCard";
import { IPetition } from "types";
import { Box } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface PetitionsListProps {
  petitions: IPetition[];
}

export const PetitionsCarousel = ({ petitions }: PetitionsListProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const petitionsToShow = petitions.slice(currentPage, currentPage + 3);

  const handleNext = () => {
    const maxPages = Math.max(petitions.length - 3, 0);
    setCurrentPage(currentPage === maxPages ? 0 : currentPage + 1);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {petitionsToShow.map((petition) => (
        <PetitionCard petition={petition} key={petition.petition_id} />
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "5px",
          cursor: "pointer",
        }}
        onClick={handleNext}
      >
         <Box
          width="1.5rem"
          height="4rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderWidth="0.5px"
          borderRadius="md"
          boxShadow={"md"}
        >
          <ChevronRightIcon w={6} h={6} />
        </Box>
      </div>
    </div>
  );
};

export default PetitionsCarousel;
