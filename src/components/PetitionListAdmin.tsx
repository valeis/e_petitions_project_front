import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Button } from '@chakra-ui/react';
import { petitions } from "../api";
interface Props {
    petition: {
        petition_id: number;
        title: string;
        description: string;
        date: string;
        author: string;
    };
}

export const PetitionDetail: React.FC<Props> = ({ petition  }) => {
    const onApprove = async (id: number) => {
        try {
            const body = {
                id: id,
                status: 'PUBLIC'
            };

            const result = await petitions.changeStatus(body);
            console.log('Status changed successfully:', result);
        } catch (error) {
            console.error('Error changing status:', error);
        }
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
                Date: {petition.petition_id}
            </Text>
            <Text fontSize="md" mb={2}>
                Author: {petition.author}
            </Text>
            <Button colorScheme="teal" onClick={() => onApprove(petition.petition_id)}>
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
