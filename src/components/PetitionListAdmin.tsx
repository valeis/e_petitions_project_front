import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Button } from '@chakra-ui/react'; // Assuming you're using Chakra UI

interface Props {
    petition: {
        id: number;
        title: string;
        description: string;
        date: string;
        author: string;
    };
}

export const PetitionDetail: React.FC<Props> = ({ petition }) => {
    const onApprove = (id: number) => {
        // Implement your onApprove logic here
    };

    return (
        <Box p={4} boxShadow="md" bg="white" borderRadius="md">
            <Text fontSize="xl" fontWeight="bold" mb={2}>
                Title: {petition.title}
            </Text>
            <Text fontSize="md" mb={2}>
                Description: {petition.description}
            </Text>
            <Text fontSize="md" mb={2}>
                Date: {petition.date}
            </Text>
            <Text fontSize="md" mb={2}>
                Author: {petition.author}
            </Text>
            <Button colorScheme="teal" onClick={() => onApprove(petition.id)}>
                Approve
            </Button>
            <Box mt={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Comments:
                </Text>
                <Button colorScheme="blue" size="sm" mt={2}>
                    Post Comment
                </Button>
            </Box>
        </Box>
    );
};

export default PetitionDetail;
