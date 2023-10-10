// AdminFooter.tsx
import { Box, Flex, Text } from '@chakra-ui/react';

const AdminFooter = () => {
    return (
        <Flex p="4" bg="gray.200" justify="center">
            <Box>
                <Text>&copy; 2023 Admin Dashboard</Text>
            </Box>
        </Flex>
    );
};

export default AdminFooter;
