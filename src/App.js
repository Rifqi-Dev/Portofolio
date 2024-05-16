import { useCallback, useEffect } from "react";
import "./App.css";
import Intro from "./components/intro";
import TechStack from "./components/TechStack";
import Resume from "./components/resume/Index";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import template from "./utils/poligon-particles.json";
import Weather from "./components/Weather";
import Earthquacke from "./components/Earthquacke";
import WhatIdo from "./components/WhatIdo";

function App() {
  useEffect(() => {
    document.title = "Rifqi Dev ";
  }, []);

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);
  return (
    <div className="App text-white ">
      <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        options={template}
      />
      <Intro />
      <section className="h-screen w-full">
        <WhatIdo />
      </section>
      <div className="text-white flex flex-wrap justify-evenly gap-5 px-10 py-5">
        <Weather />
        <Earthquacke />
      </div>
      {/* <Resume /> */}
      {/* <div className="glowing_stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div> */}
    </div>
  );
}

export default App;
