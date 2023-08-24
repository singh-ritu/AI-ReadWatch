import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [input, setInput] = useState({
    Age: "",
    era: "",
    actor: "",
    character: "",
    environment: "",
  });
  const [response, setResponse] = useState("");
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const newObj = {
      ...input,
      [e.target.name]: e.target.value,
    };
    setInput(newObj);
  };
  const talkToAI = (e) => {
    if (
      input.Age &&
      input.actor &&
      input.character &&
      input.environment &&
      input.era
    ) {
      setLoader(true);
      const sentence = `Hey gpt , i'm ${input.Age} years old. I want to watch a movie of my favorite actor ${input.actor} of ${input.era}. I want to watch with ${input.environment} of a ${input.character} character ,suggest atleast 5 movies.`;

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
        .then((res) => res.json())
        .then((res) => {
          setLoader(false);
          console.log(res);
          setResponse(res?.choices[0]?.message?.content);
        });
    }
    console.log(input);
  };

  return (
    <div>
      <div className="heading">
        <h1>AI Curated ReadWatch</h1>
        <p>
          Our AI-powered tool will guide you in choosing the perfect BOOKS/
          MOVIES when you're unsure about what to READ/WATCH. Simply fill out
          the form below with information about your Curiosity, and we'll
          suggest a curated list of BOOKS/MOVIES!
        </p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form_details">
          <p>
            Age Group:
            <input
              type="number"
              name="Age"
              className="input"
              placeholder="enter your age"
              value={input.Age}
              onChange={handleChange}
            />
          </p>
          <p>
            Genre Prefrences/Era Prefrences:
            <input
              type="text"
              name="era"
              className="input"
              placeholder="enter your era preference"
              value={input.era}
              onChange={handleChange}
            />
          </p>
          <p>
            Favourite Author/Actor:
            <input
              type="text"
              name="actor"
              className="input"
              placeholder=" enter your favourite actor"
              value={input.actor}
              onChange={handleChange}
            />
          </p>
          <p>
            Character preferences:
            <input
              type="text"
              name="character"
              className="input"
              placeholder=" enter your character preference"
              value={input.character}
              onChange={handleChange}
            />
          </p>
          <p>
            Reading/Watching Environment:
            <input
              type="text"
              name="environment"
              className="input"
              placeholder="enter environment you like to watch"
              value={input.environment}
              onChange={handleChange}
            />
          </p>
        </div>
        <div>
          <button onClick={talkToAI} disabled={loader}>
            {" "}
            {loader ? "Loading..." : "MOVIES Suggestions"}
          </button>
        </div>
        {response && (
          <div className="Response">
            <p>{response}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
