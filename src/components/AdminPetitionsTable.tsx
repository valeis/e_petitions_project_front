// src/DataTable.tsx

import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td,TableContainer,Center } from '@chakra-ui/react';

interface DataTableProps {
    data: { name: string; details:string; status: string }[];
}

const DataTableAdmin: React.FC<DataTableProps> = ({ data }) => {
    return (
      <Center>
          <TableContainer  style={{ margin: '20px' }} borderRadius="lg" >
            <Table variant="simple" borderWidth="1px"   boxShadow="md">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Status</Th>
                        <Th>Description</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.name}</Td>
                            <Td>{item.details}</Td>
                            <Td>{item.status}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
          </TableContainer>
      </Center>
    );
};

export default DataTableAdmin;
