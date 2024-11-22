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
import Sidenav from "./components/sidenav/Sidenav";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import OnlineCompiler from "./components/OnlineCompiler/OnlineCompiler";

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
            <div className=" w-100 flex-1">
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Intro />} />
                    <Route path="/skill" element={<WhatIdo />} />
                    <Route path="/project" element={<Projects />} />
                    <Route path="/resume" element={<Resume />} />
                    {/* <Route
                      path="/online-js-compiler"
                      element={<OnlineCompiler />}
                    /> */}
                    <Route path="/contact" element={<Contact />} />
                  </Route>
                </Routes>
              </Router>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
