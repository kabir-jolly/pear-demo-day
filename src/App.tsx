import React, { useState, useEffect } from 'react';
import './App.css'; 

import SearchBar from './components/SearchBar';
import CompanyCard from './components/CompanyCard';

const dummyCompanies = [
  {
    logo: 'https://via.placeholder.com/100',
    name: 'TechInnovate',
    website: 'https://techinnovate.com',
    shortDescription: 'Revolutionizing AI for small businesses',
    longDescription: 'TechInnovate is developing cutting-edge AI solutions to help small businesses automate their processes and compete with larger corporations.',
    pitchVideo: 'https://youtube.com/watch?v=dummyvideo1',
    founders: [
      {
        name: 'Jane Doe',
        email: 'jane@techinnovate.com',
        linkedIn: 'https://linkedin.com/in/janedoe',
        photo: 'https://via.placeholder.com/50',
      },
    ],
  },
  {
    logo: 'https://via.placeholder.com/100',
    name: 'GreenEnergy',
    website: 'https://greenenergy.com',
    shortDescription: 'Sustainable energy solutions for homes',
    longDescription: 'GreenEnergy is creating affordable and efficient renewable energy systems for residential use, making sustainable living accessible to everyone.',
    pitchVideo: 'https://youtube.com/watch?v=dummyvideo2',
    founders: [
      {
        name: 'John Smith',
        email: 'john@greenenergy.com',
        linkedIn: 'https://linkedin.com/in/johnsmith',
        photo: 'https://via.placeholder.com/50',
      },
      {
        name: 'Emily Brown',
        email: 'emily@greenenergy.com',
        linkedIn: 'https://linkedin.com/in/emilybrown',
        photo: 'https://via.placeholder.com/50',
      },
      {
        name: 'John Smith',
        email: 'john@greenenergy.com',
        linkedIn: 'https://linkedin.com/in/johnsmith',
        photo: 'https://via.placeholder.com/50',
      },
    ],
  },
  {
    logo: 'https://via.placeholder.com/100',
    name: 'HealthTrack',
    website: 'https://healthtrack.com',
    shortDescription: 'Personalized health monitoring app',
    longDescription: 'HealthTrack uses machine learning to provide personalized health insights and recommendations based on user data from wearable devices and manual input.',
    pitchVideo: 'https://youtube.com/watch?v=dummyvideo3',
    founders: [
      {
        name: 'Michael Johnson',
        email: 'michael@healthtrack.com',
        linkedIn: 'https://linkedin.com/in/michaeljohnson',
        photo: 'https://via.placeholder.com/50',
      },
    ],
  },
];

interface Founder {
  name: string;
  email: string;
  linkedIn: string;
  photo: string;
}

interface Company {
  logo: string;
  name: string;
  website: string;
  shortDescription: string;
  longDescription: string;
  pitchVideo: string;
  founders: Founder[];
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<Company[]>(dummyCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(dummyCompanies);

  useEffect(() => {
    const results = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.longDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.founders.some(founder => 
        founder.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredCompanies(results);
  }, [searchTerm, companies]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const resultText = () => {
    if (filteredCompanies.length === 0) return 'No matches found';
    return `Showing ${filteredCompanies.length} result${filteredCompanies.length === 1 ? '' : 's'}`;
  };

  return (
    <div className="App landing-page">
      <img src="/Pear-Logo.svg" alt="Pear Logo" className="logo" />
      <h1 className="welcome-text">
        Welcome to <span className="highlight">Demo Day!</span>
      </h1>
      <h3 className="description">
        To help you navigate through Demo Day, we put together a comprehensive list of every company participating today.
      </h3>
      <SearchBar onSearch={handleSearch} />
      <p className="results-text">{resultText()}</p>
      <div className="company-list">
        {filteredCompanies.map((company: Company, index: number) => (
          <CompanyCard key={index} {...company} />
        ))}
      </div>
    </div>
  );
}

export default App;
