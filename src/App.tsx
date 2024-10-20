import React, { useState, useEffect } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import CompanyCard from "./components/CompanyCard";
import pushCompaniesToDatabase from "./uploadData";
import { db, ref } from "./firebase";
import { onValue } from "firebase/database";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const companiesRef = ref(db, "companies");
    onValue(companiesRef, (snapshot) => {
      const data = snapshot.val();
      const companiesArray = Object.values(data) as Company[];
      setCompanies(companiesArray);
    });
  }, []);

  useEffect(() => {
    const results = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        company.longDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        company.founders.some((founder) =>
          founder.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredCompanies(results);
  }, [searchTerm, companies]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const resultText = () => {
    if (filteredCompanies.length === 0) return "No matches found";
    return `Showing ${filteredCompanies.length} result${
      filteredCompanies.length === 1 ? "" : "s"
    }`;
  };

  return (
    <div className="App landing-page">
      <img src="/Pear-Logo.svg" alt="Pear Logo" className="logo" />
      <h1 className="welcome-text">
        Welcome to <span className="highlight">Demo Day!</span>
      </h1>
      {/* <button onClick={pushCompaniesToDatabase}>
        Upload Companies to Database
      </button> */}
      <h3 className="description">
        To help you navigate through Demo Day, we put together a comprehensive
        list of every company participating today.
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
