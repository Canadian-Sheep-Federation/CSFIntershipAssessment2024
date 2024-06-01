import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sanitize and validate input
    const sanitizedPhone = phone.replace(/[^\d]/g, ''); // Remove non-numeric characters

    if (sanitizedPhone.length < 10) {
      alert("Phone number must be at least 10 digits long.");
      return;
    }

    const sanitizedEmail = email.trim();
    const sanitizedName = name.trim();

    onSubmit({ name: sanitizedName, email: sanitizedEmail, phone: sanitizedPhone });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
