import { useCallback, useEffect, useState } from "react";
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
import Loading from "./components/Loading/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setIsTransitioning(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const transitionTimeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);

      return () => clearTimeout(transitionTimeout);
    }
  }, [isLoading]);
  return (
    <div className="App text-white ">
      <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        options={template}
      />
      {isLoading && (
        <div
          className={`${
            isLoading ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <Loading />
        </div>
      )}
      <div
        className={`${
          !isLoading && !isTransitioning ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        {!isLoading && !isTransitioning && (
          <>
            <Navbar />
            <Intro />
            <section className="w-full my-4  md:min-h-screen " id="skills">
              <WhatIdo />
            </section>

            <section className="w-full my-4 " id="project">
              <Projects />
            </section>
            <section className="w-full mt-4" id="resume">
              <Resume />
            </section>
            <section className="w-full mt-8" id="contact">
              <Contact />
            </section>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
