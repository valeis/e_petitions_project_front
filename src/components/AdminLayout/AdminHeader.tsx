// AdminHeader.tsx
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

const AdminHeader = ( ) => {
    return (
        <Flex p="4" bg="blue.500" color="white">
            <Box>
                <Text fontSize="xl">Admin Dashboard</Text>
            </Box>
            <Spacer />
            <Box>
                <Text>Username</Text>
            </Box>
        </Flex>
    );
};

export default AdminHeader;
