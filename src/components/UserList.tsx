import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User'; 


// Define the props expected by the UserList component
interface UserListProps {
  users: User[];  // Array of user objects
  onEdit: (user: User) => void;  // Function to handle editing a user
  onDelete: (id: number) => void;  // Function to handle deleting a user by ID
}

// Functional component for rendering the list of users
const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            {/* Link to the user's detail page */}
            <td>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              {/* Button to trigger editing a user */}
              <button onClick={() => onEdit(user)}>Edit</button>

              {/* Button to trigger deleting a user */}
              <button onClick={() => onDelete(user.id)} className='delete'>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
