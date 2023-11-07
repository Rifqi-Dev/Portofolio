import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import template from "../utils/particles.json";
function Intro() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div>
      <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        options={template}
      />
      <div className="w-screen h-[calc(100vh-60px)] flex justify-center items-center text-white">
        Hi...
      </div>
    </div>
  );
}

export default Intro;
