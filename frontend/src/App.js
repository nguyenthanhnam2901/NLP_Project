import React, { useState } from "react";

function App() {
  const defaultText = "Welcome to the Text Summarization web app! This tool allows you to input any text and get a concise summary. You can start by clicking 'Summarize' to summarize this text, or clear it and input a new text.";
  const [text, setText] = useState(defaultText); // Set default introduction text
  const [summary, setSummary] = useState("");

  // Handle Summarization
  const handleSummarize = async () => {
    const response = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSummary(data.summary || "Error generating summary");
  };

  // Handle clearing the text
  const handleClear = () => {
    setText(defaultText);  // Reset to default text
  };

  // Update text area when user types
  const handleChange = (e) => {
    if (e.target.value === defaultText) {
      setText("");  // Clear default text when user starts typing
    } else {
      setText(e.target.value);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Text Summarization</h2>
      <textarea
        rows="5"
        style={{ width: "100%" }}
        value={text}
        onChange={handleChange}
        placeholder="Enter text to summarize"
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSummarize} style={{ marginRight: "10px" }}>
          Summarize
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <h3>Summary:</h3>
      <p>{summary}</p>
    </div>
  );
}

export default App;
