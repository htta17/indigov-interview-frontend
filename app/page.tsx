'use client'; 

import ConstituentCreateView from './ui/constituents/ConstituentCreateView';
import ConstituentListView from './ui/constituents/ConstituentListView';

import React, { useState } from 'react';
import { Constituent } from './ui/constituents/constituentModel';
import ConstituentExportView from './ui/constituents/ConstituentExportView';

export default function Page() {
  const [view, setView] = useState<'list' | 'create'>('list');

  const toggleView = () => {
    setView(view === 'list' ? 'create' : 'list');
  };

  const handleSubmit = (constituent: Constituent) => {    
    setView('list');
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <button onClick={toggleView}>
        {view === 'list' ? 'Create a new Constituent' : 'Back'}
      </button>      

      {
        view === 'list' 
          ? ( <ConstituentListView />) 
          : (<ConstituentCreateView onSubmit={handleSubmit} />)
      }

      {view === 'list' ? <ConstituentExportView /> : null}
      
    </main>
  );
}
