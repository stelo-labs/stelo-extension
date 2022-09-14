import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Widget } from "@typeform/embed-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Widget
        id="tLMNqMmI"
        style={{ width: "100%", height: "400px" }}
        className="stelo-feedback"
      />
      <div></div>
    </div>
  );
}

export default App;
