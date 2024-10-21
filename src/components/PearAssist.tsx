import React, { useState } from "react";
import "./PearAssist.css";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface PearAssistProps {
  onClose: () => void;
}

const PearAssist: React.FC<PearAssistProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Ask me about Demo Day!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      // Here you would typically call your LLM API
      // For now, we'll just echo the user's message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: `You said: ${input}`, sender: "bot" },
        ]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <div className="pear-assist">
      <div className="chat-header">
        <h3>PearAssist</h3>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default PearAssist;
