// src/UserPage.tsx
import React, { useState, useEffect } from 'react';

import {petitions,users} from "../api";
import {Layout, UserComponent,UnauthorizedMessage} from 'components';
import UserBanner from "../components/User/UserBanner";
import {IPetition, User} from 'types';
import {useQuery} from "@tanstack/react-query";




export const UserPage: React.FC<User> = ({  userId }) => {
    const accessToken = localStorage.getItem('accessToken');
    userId = localStorage.getItem('userId') as unknown as number;
    const [pets, setPetitions] = useState<IPetition[]>([]);
    const [votedPetitions, setVotedPetitions] = useState<IPetition[]>([]);
    const [loading, setLoading] = useState(true);
    const [User, setUserData] = useState([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
      if (!accessToken) {
        setError('Unauthorized');
        setLoading(false);
      }
    }, [accessToken]);
  console.log(accessToken);
    useEffect(() => {
      if (!userId) {
        setError('Unauthorized');
        setLoading(false);
      }
    }, [userId]);


    const { data: petitionsData, error: petitionsError, isLoading: petitionsLoading } = useQuery(['userPetitions', userId], () => petitions.getUserPetitions({ page: 1, limit: 10, uid: userId }));
    const { data: votedPetitionsData, error: votedPetitionsError, isLoading: votedPetitionsLoading } = useQuery(['userVotedPetitions', userId], () => petitions.getUserVotedPetitions({ page: 1, limit: 10, uid: userId }));
    const { data: userData, error: userError, isLoading: userLoading } = useQuery(['userData', userId, accessToken], () => users.getUserById(userId, accessToken));

    useEffect(() => {
        if (petitionsData && votedPetitionsData && userData) {
          setPetitions(petitionsData as IPetition[]);
          setVotedPetitions(votedPetitionsData as IPetition[]);
          setLoading(false);
          setUserData(userData);
        }
        console.log(">>>pet",pets);
      console.log(">user",userData);
    }, [petitionsData, votedPetitionsData, userData]);

    useEffect(() => {
        if (userError) {
            setError('Unauthorized');
        }
    }, [petitionsError, votedPetitionsError, userError]);



  if (error === 'Unauthorized') {
    return <UnauthorizedMessage />;
  }
  return (
      <Layout>
      <UserBanner user={User}  petitions={pets} votedPetitions={votedPetitions} />
      <UserComponent loading={loading} petitions={pets} votedPetitions={votedPetitions} />
      </Layout>
  );
};

export default UserPage;
