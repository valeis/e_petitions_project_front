// src/UserComponent.tsx
import React from 'react';

interface UserComponentProps {
  user: any[];
  loading: boolean;
  petitions:{
    user_petitions:{
    petition_id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    status: {
      id: number;
      status: string;
    };
    'user-id': number;
    vote_goal: number;
    current_votes: number;
    exp_date: string;
    updated_at: string;
    created_at: string;
    }
  }
  votedPetitions: any[];
}



export const UserComponent: React.FC<UserComponentProps> = ({ user, loading, petitions, votedPetitions }) => {
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>User Page</h1>
          <p>UID: {JSON.stringify(user)}</p>
          <p>
            {Object.values(petitions.user_petitions).map((petition: any) => petition.title).join(', ')}
          </p>
          <p>Voted Petitions: {JSON.stringify(votedPetitions)}</p>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
