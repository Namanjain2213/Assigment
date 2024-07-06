import React from 'react';
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostTable from '../Components/Posttable';
import DepartmentList from '../Components/DepartmentList';
const SecondPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('You must enter your details before accessing this page.');
      navigate('/first');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Second Page</h1>
      <PostTable />
      <DepartmentList/>
    </div>
  );
};

export default SecondPage;
