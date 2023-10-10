// PetitionDetail.tsx
import React from "react";
import "styles/admin_style.css"
import { useParams } from "react-router-dom";
import { Box, Button, Text, Card, CardBody, CardHeader, CardFooter, Divider, ButtonGroup,  Stack, Heading } from "@chakra-ui/react";

interface Petition {
    id: number;
    title: string;
    description: string;
    date: string;
    author: string;
}

interface Props {
    petition: Petition;
    onApprove: (id: number) => void;
}

export const PetitionDetail: React.FC<Props> = ({ petition, onApprove }) => {
    const { id } = useParams<{ id: string }>();

    return (
        // <Box p={4} boxShadow="md" bg="white" borderRadius="md">
        //     <Text fontSize="xl" fontWeight="bold" mb={2}>Title: {petition.title}</Text>
        //     <Text fontSize="md" mb={2}>Description: {petition.description}</Text>
        //     <Text fontSize="md" mb={2}>Date: {petition.date}</Text>
        //     <Text fontSize="md" mb={2}>Author: {petition.author}</Text>
        //     <Button colorScheme="teal" onClick={() => onApprove(petition.id)}>Approve</Button>
        //     <Box mt={4}>
        //         <Text fontSize="lg" fontWeight="bold" mb={2}>Comments:</Text>
        //         <Button colorScheme="blue" size="sm" mt={2}>Post Comment</Button>
        //     </Box>
        // </Box>
        <Box className="admin">
            <Box className="div">
                <Box className="overlap">
                    <Box className="rectangle" />
                    <p className="lorem-ipsum-is">
                        {/* Your text here */}
                    </p>
                    <Box className="text-wrapper">Details</Box>
                </Box>
                <Box className="text-wrapper-2">Petition Page</Box>
                <Box className="overlap-group">
                    <Box className="overlap-2">
                        <Box className="text-wrapper-3">Comments</Box>
                        <img className="line" alt="Line" src="https://c.animaapp.com/AoWwM78M/img/line-1.svg" />
                    </Box>
                    <Box className="text-wrapper-4">U are a mothafuka</Box>
                </Box>
                <Box className="group">
                    <Box className="div-wrapper">
                        <Box className="text-wrapper-5">Status: For review</Box>
                    </Box>
                </Box>
                <Box className="overlap-3">
                    <Box className="text-wrapper-6">Submit</Box>
                </Box>
                <Box className="text-wrapper-7">Author: Ion Creanga</Box>
                <Box className="text-wrapper-8">Date: 09/05/1879</Box>
            </Box>
        </Box>
    );
};

export default PetitionDetail;
