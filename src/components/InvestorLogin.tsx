import React, { useState } from "react";
import "./InvestorLogin.css";

interface InvestorLoginProps {
  onLogin: (investor: { name: string; email: string }) => void;
}

const InvestorLogin: React.FC<InvestorLoginProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name, email });
  };

  return (
    <div className="investor-login">
      <h2>Investor Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default InvestorLogin;
