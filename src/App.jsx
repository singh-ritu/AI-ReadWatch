import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import.meta.env.VITE_API_KEY;
import "./App.css";

function App() {
  const [input, setInput] = useState({
    age: "",
    era: "",
    actor: "",
    character: "",
    environment: "",
  });
  const [response, setResponse] = useState("");
  const [loader, setLoader] = useState(false);

  const handleInput = (e) => {
    const newobj = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newobj);
  };
  const talkToAI = (e) => {
    setLoader(true);
    const sentence = `Hey gpt , i'm ${input.age} years old. I want to watch a movie of my favorite actor ${input.actor} of ${input.era}. I want to watch with ${input.environment} of a ${input.character} character ,suggest atleast 5 movies.`;
    fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      method: "post",
      body: JSON.stringify({
        temperature: 0.7,
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: sentence,
          },
        ],
      }),
    })
      .then((res) => res.json()) // (JavaScript Object Notation)
      .then((data) => {
        setLoader(false);
        console.log(data);
        setResponse(data?.choices[0]?.message?.content);
      });

    console.log(input);
  };

  return (
    <div>
      <div className="heading">
        <h1>AI-Curated-Watch</h1>
        <h4>
          {" "}
          Our AI-powered tool will guide you in choosing the perfect MOVIES when
          you're unsure about what to WATCH. Simply fill out the form below with
          information about your Curiosity, and we'll suggest a curated list of
          MOVIES!
        </h4>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-details">
          <h4>
            AGE GROUP :
            <input
              type="number"
              name="age"
              placeholder="Enter your Age"
              className="input"
              onChange={handleInput}
              value={input.age}
            />
          </h4>
          <h4>
            GENRE/ERA PREFERENCES :
            <input
              type="text"
              name="era"
              placeholder="Enter your preferences"
              className="input"
              onChange={handleInput}
            />
          </h4>
          <h4>
            FAVOURITE ACTOR/ACTRESSES :
            <input
              type="text"
              name="actor"
              placeholder="Enter your choice"
              className="input"
              onChange={handleInput}
            />
          </h4>
          <h4>
            CHARACTER PREFERENCES :
            <input
              type="text"
              name="character"
              placeholder="Enter your preference"
              className="input"
              onChange={handleInput}
            />
          </h4>
          <h4>
            ENVIRONMENT :
            <input
              type="text"
              name="environment"
              placeholder="Enter your environment"
              className="input"
              onChange={handleInput}
            />
          </h4>
        </div>
        <div>
          <button onClick={talkToAI} disabled={loader}>
            {loader ? "Loading..." : "Movies Suggestions"}
          </button>
        </div>
        <div>
          {response && (
            <div className="handledData">
              <p>{response}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
