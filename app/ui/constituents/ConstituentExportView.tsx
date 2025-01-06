'use client';

import React, { useState, useEffect } from 'react';
import { Constituent } from './constituentModel';

const ConstituentExportView: React.FC = () => { 
    const [constituents, setConstituent] = useState<Constituent[]>([]);

    useEffect(() => {
        const fetchConstituents = async () => {
            try {        
                const response = await fetch('http://localhost:3000/constituents');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setConstituent(data);
            } catch (error: any) {
            }
        };
        fetchConstituents();
    }, []); 

    const convertToCSV = (data: Constituent[]) => {
        const header = Object.keys(data[0]).join(","); // Get headers
        const rows = data.map(row => Object.values(row).join(",")); // Convert rows to CSV
        return [header, ...rows].join("\n");
      };

    const downloadCSV = (data: Constituent[], filename = "data.csv") => {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
      
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
      
        URL.revokeObjectURL(url); // Clean up
      };

      const handleExport = () => {
        downloadCSV(constituents, "exported_data.csv");
      };

    return (    
        <>
            <div>
                <label>From:</label>
                <input type='date' />
            </div>

            <div>
                <label>To: </label>
                <input type='date' />
            </div>
            
            <button onClick={handleExport}>Export CSV file</button>
        </>
    );
};

export default ConstituentExportView;
