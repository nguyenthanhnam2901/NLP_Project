import React, { useState } from "react";

function App() {
  const defaultText = "Welcome to the Text Summarization web app! This tool is designed to transform lengthy and complex texts into concise, digestible summaries that retain the essential information and core ideas of the original content. Imagine you have a long article, a detailed report, or even an academic paper, and you need to quickly grasp the main points without wading through pages of text—this is exactly where our application shines. By simply pasting your text into the input area and clicking the 'Summarize' button, our advanced algorithms analyze and condense the material, presenting you with a streamlined version that highlights the key concepts and relevant details. The app is built with user-friendliness in mind, ensuring that even those with minimal technical expertise can easily generate accurate summaries. Furthermore, the tool offers flexibility: if the auto-generated summary doesn’t meet your expectations, you can easily clear the existing text and input a new passage to refine your results. The underlying technology employs state-of-the-art natural language processing techniques to understand context, identify important sentences, and eliminate redundancies, thus enabling you to save time and improve comprehension. Whether you are a student seeking to distill essential study notes, a professional needing to review vast amounts of data efficiently, or simply someone who loves to stay informed without getting overwhelmed by information, this web app caters to all your summarization needs. In addition to summarizing text, our platform provides options to adjust parameters for a more tailored summary, ensuring that the output meets your specific requirements. As you explore the features of this app, you will notice that it not only emphasizes accuracy and brevity but also maintains the integrity of the original message. We are continuously working to integrate even more features and improvements based on user feedback and advances in artificial intelligence, so you can expect an ever-evolving tool that adapts to your needs. Dive in, experiment with different texts, and experience firsthand how this summarization tool can streamline your workflow and enhance your understanding of complex information—all while ensuring that your data remains secure and private throughout the process.";
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
