import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { User } from '../types/User'; 


const UserDetail: React.FC = () => {
  // Extract the user ID from the URL parameters
  const { id } = useParams<{ id: string | undefined }>();
  
  // State to manage the user data and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Access the user context to get the list of users
  const { users } = useUserContext();

  useEffect(() => {
    // Function to fetch user data from the API or local storage
    const fetchUser = async () => {
      // If no ID is present, set user to null and stop loading
      if (!id) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Attempt to fetch the user from the API
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          // If the API call fails, attempt to load the user from local storage
          const localUser = loadUserFromStorage(parseInt(id, 10));
          setUser(localUser || null);
        }
      } catch (error) {
        // If an error occurs, attempt to load the user from local storage
        const localUser = loadUserFromStorage(parseInt(id, 10));
        setUser(localUser || null);
      }
      setLoading(false);
    };

    // Fetch user data when the component mounts or when `id` changes
    fetchUser();
  }, [id]);

  // Function to load a user from local storage
  const loadUserFromStorage = (userId: number): User | undefined => {
    // Retrieve and parse the users from local storage
    const users = localStorage.getItem('users');
    const localUsers = users ? JSON.parse(users) : [];
    // Find and return the user with the matching ID
    return localUsers.find((user: User) => user.id === userId);
  };

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Show a message if the user is not found
  if (!user) return <div>User not found</div>;

  // Render the user details
  return (
    <div className="user-detail-container">
      <h2 className="user-detail-title">{user.name || 'Not Provided'}</h2>

      <div className="user-detail-card">
        <h3>Personal Information</h3>
        <p><strong>Email:</strong> {user.email || 'Not Provided'}</p>
        <p><strong>Phone:</strong> {user.phone || 'Not Provided'}</p>
        <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website || 'Not Provided'}</a></p>

        <h3>Address</h3>
        <p>{user.address?.street || 'Not Provided'}, {user.address?.suite || ''}</p>
        <p>{user.address?.city || ''}, {user.address?.zipcode || ''}</p>

        <h3>Company</h3>
        <p><strong>Company Name:</strong> {user.company?.name || 'Not Provided'}</p>
      </div>

      {/* Link to navigate back to the user list */}
      <Link to="/" className="back-button">← Back to User List</Link>
    </div>
  );
};

export default UserDetail;
