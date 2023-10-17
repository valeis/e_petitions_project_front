// AdminPage.tsx
import React, {useEffect, useState} from 'react';
import { Box, Container } from '@chakra-ui/react';
import {AdminLayout, HomeHero, Layout, PetitionsSection,PetitionCard,PetitionDetail} from "components";
import {Petition} from "../types";
import {petitions} from "../api";
import {useParams} from "react-router-dom";


export const PetitionDetailAdmin = () => {
    const [petitionData, setPetitionData] = useState<any | null>(null); // Use null instead of empty array
    const { id } = useParams<{ id: string }>();

    useEffect(() => {

      async function fetchData() {
            try {
                const data = await petitions.getById(id as string);
                console.log('Received data:', data);
                setPetitionData(data);
            } catch (error) {
                console.log('Error fetching data');
            }
        }

        fetchData();
    }, [id]);

    return (
        <AdminLayout>
            <Container maxW="8xl">
                {petitionData && <PetitionDetail petition={petitionData}/>} {/* Render PetitionDetail only when data is available */}
            </Container>
        </AdminLayout>
    );
};
