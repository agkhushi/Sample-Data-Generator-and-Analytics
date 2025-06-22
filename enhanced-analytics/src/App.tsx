import React, { useState } from 'react';
import './App.css';
import EnhancedAnalytics from './components/EnhancedAnalytics';
import DataGenerator from './components/DataGenerator';

function App() {
  const [activeTab, setActiveTab] = useState<'enhanced' | 'original'>('enhanced');

  console.log('App rendering, activeTab:', activeTab);

  return (
    <div className="App">
      <h1 style={{color: 'white', textAlign: 'center', marginTop: '20px'}}>
        Enhanced Analytics Platform
      </h1>
      
      <div className="tab-toggle">
        <button 
          className={`tab-btn ${activeTab === 'enhanced' ? 'active' : ''}`}
          onClick={() => {
            console.log('Enhanced tab clicked');
            setActiveTab('enhanced');
          }}
        >
          🚀 Enhanced Analytics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'original' ? 'active' : ''}`}
          onClick={() => {
            console.log('Original tab clicked');
            setActiveTab('original');
          }}
        >
          📊 Original Data Generator
        </button>
      </div>

      <div style={{color: 'white', textAlign: 'center', margin: '20px'}}>
        Current Tab: {activeTab}
      </div>

      {activeTab === 'enhanced' ? (
        <EnhancedAnalytics />
      ) : (
        <DataGenerator />
      )}
    </div>
  );
}

export default App;
