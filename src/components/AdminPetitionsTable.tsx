// src/DataTable.tsx

import React from 'react';
import {BadgeComponent} from "../components";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Center,
    LinkBox,
    LinkOverlay,
    VStack,
    Text,
    Badge,
    Flex,
    Stack
} from '@chakra-ui/react';


interface DataTableProps {
    data: any[];
}

const DataTableAdmin: React.FC<DataTableProps> = ({data}) => {
    return (
        <Center>
            <VStack direction='column' align='center' w='100%'>
                {data.map((item, index) => (

                    <LinkBox
                        key={index}
                        // as="div"
                        p="4"
                        m="1"
                        borderWidth="1px"
                        borderRadius="lg"
                        maxW="90%"
                        w="100%"
                        overflow="hidden"
                        boxShadow="md"
                        display="flex"
                        flexDirection="row"
                        gap="10"
                    >

                        <LinkOverlay href={`/admin/pet/${item.petition_id}`}>
                            <Text fontWeight="bold" fontSize="xl">
                                {item.title}
                            </Text>
                            <Text color="gray.600" maxW="sm">
                                {item.description}
                            </Text>
                            <BadgeComponent item={item.status.status}/>
                        </LinkOverlay>
                    </LinkBox>

                ))}
            </VStack>
        </Center>

    );
};

export default DataTableAdmin;
