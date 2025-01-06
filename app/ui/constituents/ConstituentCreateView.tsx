'use client';

import React, { useState, useEffect } from 'react';
import { Constituent } from './constituentModel';

interface FormProps {
    onSubmit: (constituent: Constituent) => void;
  }

const ConstituentCreateView: React.FC<FormProps> = ({ onSubmit }) => {

    const [constituent, setConstituent] = useState<Constituent>({
        name: '',
        email: '',
        address: "",
        id: 0
      });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/constituents', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(constituent),
            });
        
            if (!response.ok) {
                throw new Error('Error creating constituent');
            }
                
            const data = await response.json();

            console.log('Constituent created successfully', data);

            onSubmit(constituent);

          } catch (error) {
            console.error('Error creating constituent:', error);            
          }

    };

    const handleElementChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConstituent({ ...constituent, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} className="constituents-form">
            <h1>Create New Constituent</h1>

            <div>
                <label htmlFor="name">Full Name</label>
                <input
                type="text"
                id="name"
                name="name"
                value={constituent.name}
                onChange={handleElementChange}
                placeholder="Enter your full name" />
            </div>

            <div>
                <label htmlFor="name">Email</label>
                <input
                type="text"
                id="email"
                name="email"
                value={constituent.email}
                onChange={handleElementChange}
                placeholder="Enter your email" />
            </div>

            <div>
                <label htmlFor="name">Address</label>
                <input
                type="text"
                id="address"
                name="address"
                value={constituent.address}
                onChange={handleElementChange}
                placeholder="Enter your Address" />
            </div>

            <button className='create-button' type="submit">Create Constituent</button>        
        </form>
    );
};

export default ConstituentCreateView;
