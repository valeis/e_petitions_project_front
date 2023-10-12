// AdminHeader.tsx
import { Box, Flex, Spacer, Text, Link } from '@chakra-ui/react';

const AdminHeader = ( ) => {
    return (
        <Flex p="4" >
            <Box>
                <Link href={`/admin/pet`} overflow="hidden">
                <Text fontSize="xl"  fontWeight="900" color="black">Admin Dashboard</Text>
                </Link>
            </Box>
            <Spacer />
            <Box>
                <Text>Username</Text>
            </Box>
        </Flex>
    );
};

export default AdminHeader;
