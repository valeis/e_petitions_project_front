// AdminPage.tsx
import React, { useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { AdminLayout, Layout, PetitionsSection, PetitionCard, PetitionDetail } from "components";
// import {IPetition} from "../types";
import { petitions } from "../api";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const PetitionDetailAdmin = () => {
  const [petitionData, setPetitionData] = useState<any | null>(null); // Use null instead of empty array
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 5;

  const { data, isFetching, isLoading, isSuccess } = useQuery(
    ["petition", id],
    () => petitions.getById(id as string),
    {
      onSuccess: (data) => {
        setPetitionData(data);
        
      },
    },
  );
  console.log("fdsfa",data);
  /*  useEffect(() => {

      async function fetchData() {
            try {
                const data = await petitions.getList({page, limit}:);
                console.log('Received data:', data);
                setPetitionData(data);
                console.log(petitionData);
            } catch (error) {
                console.log('Error fetching data');
            }
        }

        fetchData();
    }, [id]); */

  return (
    <AdminLayout>
      <Container maxW="8xl">
        {petitionData && <PetitionDetail petition={petitionData} />}{" "}
        {/* Render PetitionDetail only when data is available */}
      </Container>
    </AdminLayout>
  );
};
