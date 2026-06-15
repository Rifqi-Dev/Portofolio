import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import StarField from "./components/StarField";
import Loading from "./components/Loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.title = "Rifqi Dev";
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setVisible(true), 100);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App text-white bg-black min-h-screen">
      <StarField />
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <Loading />
        </div>
      )}
      <div
        className={`transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {!isLoading && (
          <>
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
