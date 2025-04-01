import "./App.css";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [scriptResponse, setScriptResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/generate-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setScriptResponse(data.script);

      // Save prompt to Firestore only after successful response
      await addDoc(collection(db, "prompts"), { text: prompt });
      fetchPrompts(); // refresh saved list of prompts
    } catch (err) {
      console.error("Error calling Flask API:", err);
      setScriptResponse("Error generating script.");
    }

    setPrompt("");
  };

  const fetchPrompts = async () => {
    // read all prompt documents from firestore
    const querySnapshot = await getDocs(collection(db, "prompts"));

    // update the UI list (setPrompts) with stored/fetched prompt texts
    const data = querySnapshot.docs.map((doc) => doc.data().text);
    setPrompts(data);
  };

  // run fetchPrompts() once when the app loads to display saved prompts/data
  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div className="App">
      <h1>Script Prompt Saver</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a video script prompt..."
          style={{ width: "100%", padding: 10 }}
        />
        <button type="submit">Generate</button>
      </form>

      {scriptResponse && (
        <div>
          <h2>Generated Script:</h2>
          <p>{scriptResponse}</p>
        </div>
      )}

      <h2>Saved Prompts:</h2>
      {prompts.length > 0 ? (
        <ul>
          {/* loop through prompts array and display each prompt as a list item */}
          {prompts.map((promptText, index) => (
            <li key={index}>{promptText}</li>
          ))}
        </ul>
      ) : (
        <p>No saved prompts yet.</p>
      )}
    </div>
  );
}

export default App;
