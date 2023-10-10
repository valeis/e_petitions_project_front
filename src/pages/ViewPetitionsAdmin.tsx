// src/AdminPage.tsx

import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { data } from '../data/petitons';
import {AdminLayout} from "../components";
import DataTableAdmin from "../components/AdminPetitionsTable";

export const ViewPetitionsAdmin: React.FC = () => {
  return (
      <AdminLayout>
        <DataTableAdmin data={data}></DataTableAdmin>
      </AdminLayout>
  );
};

export default ViewPetitionsAdmin;
