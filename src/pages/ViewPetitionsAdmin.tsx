// src/AdminPage.tsx

import React, {useEffect, useState} from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import {AdminLayout} from "../components";
import DataTableAdmin from "../components/AdminPetitionsTable";
import {petitions} from "../api";

export const ViewPetitionsAdmin: React.FC = () => {
  const [petitionData, setPetitionData] = useState<any[]>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await petitions.getList({ page: 1, limit: 10 });
  //       console.log('Received data:', data.petitions);
  //       setPetitionData(data.petitions);
  //     } catch (error) {
  //       console.log('Error fetching data');
  //     }
  //   }
  //   console.log("macrii pidar:",petitionData)
  //   fetchData();
  // }, []);


  const {data: data, isLoading, isSuccess} = useQuery({
    queryFn: async () => {
      return await  petitions.getList({ page: 1, limit: 10 });
    },
    onSuccess: (data) => {
      setPetitionData(data);
      console.log(data);
    },
  });
  return (
      <AdminLayout>
        <DataTableAdmin data={petitionData}></DataTableAdmin>
      </AdminLayout>
  );
};

export default ViewPetitionsAdmin;
