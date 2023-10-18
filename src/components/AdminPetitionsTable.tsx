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
    Stack, Heading, Divider
} from '@chakra-ui/react';


interface DataTableProps {
    data: any[];
}

const DataTableAdmin: React.FC<DataTableProps> = ({data}) => {
    return (
        <Center gridColumn="span 16"
                sx={{ display: "center" }}
                width="auto"
                paddingLeft="10" >
            <VStack direction='column' align='center' w='100%'>
                {data.map((item, index) => (
                    <Box key={index} w="100%">
                        <LinkBox
                            p="4"
                            m="1"
                            borderRadius="lg"
                            maxW="90%"
                            w="100%"
                            overflow="hidden"

                        >
                            <LinkOverlay href={`/admin/pet/${item.petition_id}`}>
                                <Heading fontWeight="bold" fontSize="xl" >
                                    {item.title}
                                </Heading>
                                <Text color="gray.500" fontSize="md">
                                    {item.description.slice(0, 100)}
                                    {item.description.length > 100 && '...'}
                                </Text>
                                <BadgeComponent item={item.status.status}/>
                            </LinkOverlay>
                        </LinkBox>
                        {index < data.length - 1 && <Divider borderColor="gray.200" />}
                    </Box>
                ))}
            </VStack>
        </Center>


    );
};

export default DataTableAdmin;
