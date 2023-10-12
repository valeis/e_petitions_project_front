import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useToast, Text, Button, Card, CardBody, HStack, Input, Link, Select, Box} from '@chakra-ui/react';
import {petitions} from "../api";
import {users} from "../api";

interface Props {
    petition: {
        petition_id: number;
        title: string;
        description: string;
        date: string;
        created_at:string;
        user_id: string;
    };

}

interface User {
    email: string;
}
export const PetitionDetail: React.FC<Props> = ({petition}) => {
    const [selectedValue, setSelectedValue] = useState('publish');
    const toast = useToast();
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };
    const onApprove = async (id: number, status: string) => {
        try {
            const body = {
                id: id,
                status: status === 'publish' ? 'PUBLIC' : 'DRAFT',
            };

            const result = await petitions.changeStatus(body);
            console.log('Status changed successfully:', result);
            toast({
                title: 'Response Successfully Sent',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.error('Error changing status:', error);
        }
    };


    const [userInfo, setUserInfo] = useState<User | null>(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await users.getUserById(petition.user_id);

                setUserInfo(user);
            } catch (error) {
                console.error('Error fetching author info:', error);
            }
        };

        fetchUserInfo();

    }, [petition.user_id]);

    return (
        <Card boxShadow="md" bg="white" borderRadius="md" p={4} mb={4}>
            <CardBody>
                <Text fontSize="xl" fontWeight="bold" mb={2} >
                    {petition.title}
                </Text>
                <HStack spacing='24px'>
                    <Text fontSize="md" color='gray.500' mb={2}>
                        Date: {petition.user_id && (
                        <Box as="span" color="black">
                            {petition.user_id}
                        </Box>
                    )}
                    </Text>
                    <Text fontSize="md" color='gray.500' mb={2}>
                        Author's Email: {userInfo && (
                        <Box as="span" color="black">
                            {userInfo.email}
                        </Box>
                    )}
                    </Text>
                </HStack>
                <Card fontSize="md" mb={2}>
                    <CardBody>
                        <Text size='md' color='gray.500' mb={2}>Description:</Text>
                        {petition.description}
                    </CardBody>
                </Card>
                <Select mb={2} placeholder='What do you think?' value={selectedValue} onChange={handleSelectChange}>
                    <option value='publish'>Publish</option>
                    <option value='disapprove'>Send to user's drafts</option>
                </Select>
                <Button colorScheme="blue"  mb={2} onClick={() => onApprove(petition.petition_id, selectedValue)}>
                    Send response
                </Button>
            </CardBody>
            <CardBody mt={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Comments:
                </Text>
                <Input
                    placeholder="Write your comment here..."
                    variant="outline"
                    size="md"
                    mt={2}
                />
                <Button colorScheme="pink" size="sm" mt={2}>
                    Post Comment
                </Button>
            </CardBody>
        </Card>
    );
};

export default PetitionDetail;
