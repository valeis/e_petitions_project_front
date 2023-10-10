// AdminPage.tsx
import React, {useState} from 'react';
import { Box, Container } from '@chakra-ui/react';
import {AdminLayout, HomeHero, Layout, PetitionsSection,PetitionCard,PetitionDetail} from "components";
import {Petition} from "../types";
//TODO to replace hardcode
const petition = {
    id: 1,
    title: "Petition 1",
    description: "Description of petition 1",
    date: "2023-10-10",
    author: "Author 1",
};

const handleApprove = (id: number) => {
    // Add your approval logic here
    console.log(`Petition with ID ${id} approved`);
};

export const Admin = () => {
    return (
        <AdminLayout>
            <Container maxW="8xl">
                <PetitionDetail petition={petition} onApprove={handleApprove}></PetitionDetail>
            </Container>
        </AdminLayout>
    );
};

export default Admin;
