// src/components/UserManagement.tsx
import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleCreateUser = (newUser: Omit<User, 'id'>) => {
    const newUserWithId = {
      ...newUser,
      id: users.length + 1,
    };
    setUsers([...users, newUserWithId]);
    setIsModalOpen(false); // Close modal after creating user
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
    setIsModalOpen(false); // Close modal after updating user
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open modal to edit the user
  };

  return (
    <div className="user-management-container">

      {/* Button to open the Create User modal */}
      <button onClick={() => setIsModalOpen(true)} className="create-user-button">
        Create User
      </button>

      {/* Show spinner while loading */}
      {loading ? (
       <div className="spinner-container">
       <div className="spinner"></div>
     </div>
     
      ) : (
        <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      )}

      {/* UserForm as a modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <UserForm
              selectedUser={selectedUser}
              onCreate={handleCreateUser}
              onUpdate={handleUpdateUser}
            />
           <button onClick={() => setIsModalOpen(false)} className="close-modal-button">
  &times;
</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
