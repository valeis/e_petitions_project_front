// AdminHeader.tsx
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

const AdminHeader = ( ) => {
    return (
        <Flex p="4" >
            <Box>
                <Text fontSize="xl"  fontWeight="900" color="black">Admin Dashboard</Text>
            </Box>
            <Spacer />
            <Box>
                <Text>Username</Text>
            </Box>
        </Flex>
    );
};

export default AdminHeader;
