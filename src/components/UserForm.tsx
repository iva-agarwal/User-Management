import React, { useState, useEffect } from 'react';
import { User } from '../types/User'; // Adjust the path based on your folder structure

interface UserFormProps {
  selectedUser: User | null;
  onCreate: (newUser: Omit<User, 'id'>) => void;
  onUpdate: (updatedUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ selectedUser, onCreate, onUpdate }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [addressStreet, setAddressStreet] = useState<string>('');
  const [addressCity, setAddressCity] = useState<string>('');
  const [addressZipcode, setAddressZipcode] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setAddressStreet(selectedUser.address?.street || '');
      setAddressCity(selectedUser.address?.city || '');
      setAddressZipcode(selectedUser.address?.zipcode || '');
      setCompanyName(selectedUser.company?.name || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setAddressStreet('');
      setAddressCity('');
      setAddressZipcode('');
      setCompanyName('');
    }
  }, [selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
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
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Address Street</label>
        <input
          type="text"
          value={addressStreet}
          onChange={(e) => setAddressStreet(e.target.value)}
        />
      </div>
      <div>
        <label>Address City</label>
        <input
          type="text"
          value={addressCity}
          onChange={(e) => setAddressCity(e.target.value)}
        />
      </div>
      <div>
        <label>Address Zipcode</label>
        <input
          type="text"
          value={addressZipcode}
          onChange={(e) => setAddressZipcode(e.target.value)}
        />
      </div>
      <div>
        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <button type="submit">
        {selectedUser ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
