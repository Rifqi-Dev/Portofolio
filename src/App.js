import { useEffect } from "react";
import "./App.css";
import Intro from "./components/intro";
import About from "./components/About";
import TechStack from "./components/TechStack";

function App() {
  useEffect(() => {
    document.title = "Rifqi Dev";
  }, []);
  return (
    <div className="App">
      <p className=" text-[5px] text-white h-[60px]">under development</p>

      <Intro></Intro>
      <TechStack />
    </div>
  );
}

export default App;
