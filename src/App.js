import { useEffect } from "react";
import "./App.css";
import Intro from "./components/intro";
import About from "./components/About";
import Projects from "./components/Projects";

function App() {
  useEffect(() => {
    document.title = "Rifqi Dev";
  }, []);
  return (
    <div className="App">
      <p className=" text-[5px] text-white h-[60px]">under development</p>
      <Intro></Intro>
      {/* <About /> */}
      <Projects />
    </div>
  );
}

export default App;
