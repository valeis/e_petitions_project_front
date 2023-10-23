// src/UserPage.tsx
import React, { useState, useEffect } from 'react';

import {petitions,users} from "../api";
import {Layout, UserComponent,UnauthorizedMessage} from 'components';
import UserBanner from "../components/User/UserBanner";
import {User} from 'types';
import {useQuery} from "@tanstack/react-query";




export const UserPage: React.FC<User> = ({  userId }) => {
    const accessToken = localStorage.getItem('accessToken');
    const [pets, setPetitions] = useState([]);
    const [votedPetitions, setVotedPetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [User, setUserData] = useState([]);
    const [error, setError] = useState<string | null>(null);
    if (!accessToken) {
      setError('Unauthorized');
      setLoading(false);
      return;
    }

    userId = localStorage.getItem('userId') as unknown as number;
    if (!userId) {
      setError('Unauthorized');
      setLoading(false);
      return;
    }

    const { data: petitionsData, error: petitionsError, isLoading: petitionsLoading } = useQuery(['userPetitions', userId], () => petitions.getUserPetitions({ page: 1, limit: 10, uid: userId }));
    const { data: votedPetitionsData, error: votedPetitionsError, isLoading: votedPetitionsLoading } = useQuery(['userVotedPetitions', userId], () => petitions.getUserVotedPetitions({ page: 1, limit: 10, uid: userId }));
    const { data: userData, error: userError, isLoading: userLoading } = useQuery(['userData', userId, accessToken], () => users.getUserById(userId, accessToken));

    useEffect(() => {
        if (petitionsData && votedPetitionsData && userData) {
            setPetitions(petitionsData);
            setVotedPetitions(votedPetitionsData);
            setLoading(false);
            setUserData(userData);
        }
    }, [petitionsData, votedPetitionsData, userData]);

    useEffect(() => {
        if (petitionsError || votedPetitionsError || userError) {
            setError('Unauthorized');
        }
    }, [petitionsError, votedPetitionsError, userError]);

  if (error === 'Unauthorized') {
    return <UnauthorizedMessage />;
  }
  return (
      <Layout>
      <UserBanner user={User}  petitions={pets} votedPetitions={votedPetitions} />
      <UserComponent user={User} loading={loading} petitions={pets} votedPetitions={votedPetitions} />
      </Layout>
  );
};

export default UserPage;
