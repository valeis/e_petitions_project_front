// src/UserPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {petitions,users} from "../api";
import {Layout, UserComponent} from 'components';
import {User} from 'types';
import { useUser } from "hooks";



export const UserPage: React.FC<User> = ({  userId }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        console.log('Access Token:', accessToken);
    } else {
        console.log('Access Token not found in local storage');
    }

    userId = localStorage.getItem('userId') as unknown as number;
    if (userId) {
        console.log('userId:', userId);
    } else {
        console.log('userId not found in local storage');
    }
  const [pets, setPetitions] = useState([]);
  const [votedPetitions, setVotedPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [User, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userId);
        console.log(accessToken);
        const petitionsData = await petitions.getUserPetitions({ page: 1, limit: 10, uid: userId });
        const votedPetitionsData = await petitions.getUserVotedPetitions({ page: 1, limit: 10, uid: userId });
        const userData = await users.getUserById(userId, accessToken);

        setPetitions(petitionsData);
        setVotedPetitions(votedPetitionsData);
        setLoading(false);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
      <Layout>
      <UserComponent user={User} loading={loading} petitions={pets} votedPetitions={votedPetitions} />
      </Layout>);
};

export default UserPage;
