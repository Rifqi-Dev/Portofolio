import { useEffect } from "react";
import "./App.css";
import Intro from "./components/intro";

function App() {
  useEffect(() => {
    document.title = "Rifqi Dev";
  }, []);
  return (
    <div className="App">
      <Intro></Intro>
    </div>
  );
}

export default App;
