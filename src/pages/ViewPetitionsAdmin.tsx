// src/AdminPage.tsx

import React, {useEffect, useState} from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import {AdminLayout} from "../components";
import DataTableAdmin from "../components/AdminPetitionsTable";
import {petitions} from "../api";

export const ViewPetitionsAdmin: React.FC = () => {
  const [petitionData, setPetitionData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await petitions.getList({ page: 1, limit: 10 });
        console.log('Received data:', data);
        setPetitionData(data);
      } catch (error) {
        console.log('Error fetching data');
      }
    }

    fetchData();
  }, []);
  return (
      <AdminLayout>
        <DataTableAdmin data={petitionData}></DataTableAdmin>
      </AdminLayout>
  );
};

export default ViewPetitionsAdmin;
