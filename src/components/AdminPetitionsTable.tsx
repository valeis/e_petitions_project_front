// src/DataTable.tsx

import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td,TableContainer,Center,LinkBox,LinkOverlay,Flex,Stack } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

interface DataTableProps {
  data: any[];
}

const DataTableAdmin: React.FC<DataTableProps> = ({ data }) => {
    return (
        <Center>
            <Flex flexWrap="wrap" justifyContent="center">
                {data.map((item, index) => (
                    <LinkBox
                        key={index}
                        as="div"
                        p="4"
                        m="4"
                        borderWidth="1px"
                        borderRadius="lg"
                        maxW="sm"
                        w="100%"
                        overflow="hidden"
                        boxShadow="md"
                    >
                        <LinkOverlay href={`/admin/pet/${item.petition_id}`}>

                            <Box as="h3" fontSize="xl" mb="2">
                                {item.title}
                            </Box>
                        </LinkOverlay>
                        <Box fontWeight="semibold" as="p" lineHeight="tight">
                            Status: {item.status.status}
                        </Box>
                        <Box as="p" color="gray.600" fontSize="sm">
                            {item.description}
                        </Box>
                    </LinkBox>
                ))}
            </Flex>
        </Center>
    );
};

export default DataTableAdmin;
