// src/views/UserDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company?: { name: string };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>(); // Handle `undefined` as well
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { users } = useUserContext(); // Access the user context

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          // Fallback to local users if API call fails or user is not found
          const localUser = users.find(user => user.id === parseInt(id, 10));
          setUser(localUser || null);
        }
      } catch (error) {
        // Handle error and fallback
        const localUser = users.find(user => user.id === parseInt(id, 10));
        setUser(localUser || null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [id, users]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) return <div>User not found</div>;

  return (
    <div className="user-detail-container">
      <h2 className="user-detail-title">{user.name ?? ' '}</h2>
      
      <div className="user-detail-card">
        <h3>Personal Information</h3>
        <p><strong>Email:</strong> {user.email ?? ' '}</p>
        <p><strong>Phone:</strong> {user.phone ?? ' '}</p>
        <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website ?? ' '}</a></p>

        <h3>Address</h3>
        <p>{user.address?.street ?? ' '}, {user.address?.suite ?? ' '}</p>
        <p>{user.address?.city ?? ' '}, {user.address?.zipcode ?? ' '}</p>

        <h3>Company</h3>
        <p><strong>Company Name:</strong> {user.company?.name ?? ' '}</p>
      </div>

      <Link to="/" className="back-button">← Back to User List</Link>
    </div>
  );
};

export default UserDetail;
