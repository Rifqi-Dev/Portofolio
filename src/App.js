import { useCallback, useEffect } from "react";
import "./App.css";
import Intro from "./components/intro";
import Resume from "./components/resume/Index";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import template from "./utils/stars-particles.json";
import Weather from "./components/Weather";
import Earthquacke from "./components/Earthquacke";
import WhatIdo from "./components/WhatIdo";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";

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
      <Navbar />
      <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        options={template}
      />
      <Intro />
      <section className="w-full my-4  md:min-h-screen " id="skills">
        <WhatIdo />
      </section>
      <section className="w-full my-4 " id="project">
        <Projects />
      </section>
      <section className="w-full mt-8" id="contact">
        <Contact />
      </section>
      {/* <div className="text-white flex flex-wrap justify-evenly gap-5 px-10 py-5">
        <Weather />
        <Earthquacke />
      </div> */}
      {/* <Resume /> */}
      <Footer />
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
