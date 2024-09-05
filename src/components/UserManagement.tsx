import React, { useEffect, useState } from 'react';
import UserList from './UserList'; // Component to display the list of users
import UserForm from './UserForm'; // Component to create or edit a user
import Alert from './Alert'; // Component to display success or error messages
import { User } from '../types/User'; 


const UserManagement: React.FC = () => {
  // State to manage the list of users
  const [users, setUsers] = useState<User[]>([]);

  // State to track the selected user for editing
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // State to indicate if data is loading
  const [loading, setLoading] = useState<boolean>(true);

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // State to display alerts (success or error messages)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Helper function to store users in localStorage
  const saveUsersToLocalStorage = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // useEffect hook to fetch users from localStorage or API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Try to get users from local storage first
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers)); // Load users from localStorage if available
          setLoading(false);
        } else {
          // If no users in local storage, fetch from API
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data); // Set users from API response
          saveUsersToLocalStorage(data); // Store fetched users in localStorage
        }
      } catch (error) {
        // Show error message if fetching fails
        setAlert({ message: 'Error fetching users. Please try again.', type: 'error' });
      } finally {
        setLoading(false); // Set loading state to false when data is loaded
      }
    };

    fetchUsers();
  }, []);

  // Function to create a new user
  const handleCreateUser = async (newUser: Omit<User, 'id'>) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      const updatedUsers = [...users, data]; // Add new user to the users list
      setUsers(updatedUsers); // Update state with the new user list
      saveUsersToLocalStorage(updatedUsers); // Store updated users in localStorage
      setIsModalOpen(false); // Close the modal
      setAlert({ message: 'User successfully created!', type: 'success' }); // Show success message
    } catch (error) {
      // Show error message if user creation fails
      setAlert({ message: 'Failed to create user. Please try again.', type: 'error' });
    }
  };

  // Function to update an existing user
  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ); // Replace the updated user in the list
      setUsers(updatedUsers); // Update state with the new user list
      saveUsersToLocalStorage(updatedUsers); // Store updated users in localStorage
      setSelectedUser(null); // Deselect the user
      setIsModalOpen(false); // Close the modal
      setAlert({ message: 'User successfully updated!', type: 'success' }); // Show success message
    } catch (error) {
      // Show error message if user update fails
      setAlert({ message: 'Failed to update user. Please try again.', type: 'error' });
    }
  };

  // Function to delete a user
  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const updatedUsers = users.filter((user) => user.id !== id); // Filter out the deleted user
      setUsers(updatedUsers); // Update state with the new user list
      saveUsersToLocalStorage(updatedUsers); // Store updated users in localStorage
      setAlert({ message: 'User successfully deleted!', type: 'success' }); // Show success message
    } catch (error) {
      // Show error message if user deletion fails
      setAlert({ message: 'Failed to delete user. Please try again.', type: 'error' });
    }
  };

  // Function to edit a user
  const handleEditUser = (user: User) => {
    setSelectedUser(user); // Set the selected user for editing
    setIsModalOpen(true); // Open the modal to edit the user
  };

  // Function to close the alert message
  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <div className="user-management-container">
      {/* Button to open the modal to create a new user */}
      <button onClick={() => setIsModalOpen(true)} className="create-user-button">
        Create User
      </button>

      {/* Display a loading spinner while data is being fetched */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} /> // Display the user list
      )}

      {/* Modal for creating or editing a user */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <UserForm
              selectedUser={selectedUser} // Pass the selected user (if any) for editing
              onCreate={handleCreateUser} // Function to create a new user
              onUpdate={handleUpdateUser} // Function to update an existing user
            />
            {/* Close modal button */}
            <button onClick={() => setIsModalOpen(false)} className="close-modal-button">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Display an alert message if there is one */}
      {alert && (
        <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default UserManagement;
