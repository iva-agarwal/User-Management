import React, { useState, useEffect } from 'react';
import { User } from '../types/User'; 

// Define the props for the UserForm component
interface UserFormProps {
  selectedUser: User | null; // Holds the selected user for editing, or null if creating a new user
  onCreate: (newUser: Omit<User, 'id'>) => void; // Callback for creating a new user (ID is excluded)
  onUpdate: (updatedUser: User) => void; // Callback for updating an existing user
}

const UserForm: React.FC<UserFormProps> = ({ selectedUser, onCreate, onUpdate }) => {
  // State variables to manage form fields
  const [name, setName] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [phone, setPhone] = useState<string>('');
  const [addressStreet, setAddressStreet] = useState<string>(''); 
  const [addressCity, setAddressCity] = useState<string>('');
  const [addressZipcode, setAddressZipcode] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>(''); 

  // This useEffect hook runs whenever the selectedUser changes.
  // It pre-fills the form if there is a selectedUser, otherwise it clears the form for new user creation.
  useEffect(() => {
    if (selectedUser) {
      // If editing an existing user, prefill the form with user data
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setAddressStreet(selectedUser.address?.street || ''); // Use empty string if field is undefined
      setAddressCity(selectedUser.address?.city || '');
      setAddressZipcode(selectedUser.address?.zipcode || '');
      setCompanyName(selectedUser.company?.name || '');
    } else {
      // Clear form fields for new user creation
      setName('');
      setEmail('');
      setPhone('');
      setAddressStreet('');
      setAddressCity('');
      setAddressZipcode('');
      setCompanyName('');
    }
  }, [selectedUser]); // Runs when selectedUser changes

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)

    // Check if editing an existing user or creating a new one
    if (selectedUser) {
      // Update existing user
      onUpdate({
        id: selectedUser.id,
        name,
        email,
        phone,
        address: {
          street: addressStreet,
          city: addressCity,
          zipcode: addressZipcode,
        },
        company: {
          name: companyName,
        },
      });
    } else {
      // Create a new user
      onCreate({
        name,
        email,
        phone,
        address: {
          street: addressStreet,
          city: addressCity,
          zipcode: addressZipcode,
        },
        company: {
          name: companyName,
        },
      });
    }

    // Clear form fields after submission
    setName('');
    setEmail('');
    setPhone('');
    setAddressStreet('');
    setAddressCity('');
    setAddressZipcode('');
    setCompanyName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input field */}
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Email input field */}
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Phone input field */}
      <div>
        <label>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      {/* Optional Address fields */}
      <div>
        <label>Address Street</label>
        <input
          type="text"
          value={addressStreet}
          onChange={(e) => setAddressStreet(e.target.value)}
          placeholder='Optional'
        />
      </div>
      <div>
        <label>Address City</label>
        <input
          type="text"
          value={addressCity}
          onChange={(e) => setAddressCity(e.target.value)}
          placeholder='Optional'
        />
      </div>
      <div>
        <label>Address Zipcode</label>
        <input
          type="text"
          value={addressZipcode}
          onChange={(e) => setAddressZipcode(e.target.value)}
          placeholder='Optional'
        />
      </div>

      {/* Optional Company name field */}
      <div>
        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder='Optional'
        />
      </div>

      {/* Submit button, changes label based on whether it's updating or creating a user */}
      <button type="submit">
        {selectedUser ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
