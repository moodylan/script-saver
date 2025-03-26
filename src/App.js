import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [prompts, setPrompts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    // save/add prompt to firestore -> use addDoc():
    // add a new prompt to the 'prompts' collection in firestore
    // text field stores the current value of the user's prompt
    await addDoc(collection(db, "prompts"), { text: prompt });

    // clear input and fetch updated list of prompts
    setPrompt("");
    fetchPrompts();
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
        <button type="submit">Submit</button>
      </form>
      <h2>Saved Prompts:</h2>
      <ul>
        {/* loop through prompts array and display each prompt as a list item */}
        {prompts.map((promptText, index) => (
          <li key={index}>{promptText}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
