import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './firstpage.css'

const FirstPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && email) {
      localStorage.setItem('user', JSON.stringify({ name, phone, email }));
      navigate('/second');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='container' >
        <h1 className='heading' >Enter Your Details Here</h1>
      <div className='inp-form'>
        <label>Name: </label>
        <input type="text" placeholder='Enter Your name' value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className='inp-form'>
        <label>Phone: </label>
        <input type="text" value={phone} placeholder='Enter Your Phone No' onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div className='inp-form'>
        <label>Email: </label>
        <input type="email" value={email} placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button type="submit" className=' button'>Submit</button>
    </div>
    </form>
  );
};

export default FirstPage;
