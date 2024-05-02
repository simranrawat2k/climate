import React from "react";
import { Weather } from "./Weather";
import Theme from "./Theme";

function App() {

  return (
    <div className="App">
      <Theme/>
      <div className="container">
        <Weather />
      </div>
    </div>
  );
}

export default App;

