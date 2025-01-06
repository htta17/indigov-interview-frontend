'use client';

import React, { useState, useEffect } from 'react';
import { Constituent } from './constituentModel';

const ConstituentListView: React.FC = () => {
  
  const [constituents, setConstituent] = useState<Constituent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // UseEffect hook to fetch data after the component mounts
  useEffect(() => {
    const fetchConstituents = async () => {
      try {        
        const response = await fetch('http://localhost:3000/constituents');
        
        if (!response.ok) {
          throw new Error('Failed to fetch constituents');
        }
        const data = await response.json();
        setConstituent(data);
        setLoading(false); // Data loaded, stop loading
      } catch (error: any) {
        
        setError(error.message);
        setLoading(false); // Even if an error occurs, stop loading
      }
    };

    // Call the async function to fetch the data
    fetchConstituents();
  }, []); // Empty dependency array means this runs once after the first render

  // Conditionally render content based on the loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (    
    <div>
      <h1>Constituents List</h1>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        {constituents.map((constituent) => (
          <tr key={constituent.id}>
            <td>{constituent.name}</td>
            <td>{constituent.email}</td>
            <td>{constituent.address}</td>
          </tr>
        ))}
        </tbody>
      </table>

     
    </div>
  );
};

export default ConstituentListView;
