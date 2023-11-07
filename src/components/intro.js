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
      <div className="w-screen h-[calc(100vh-60px)] flex justify-center items-center flex-col text-white">
        <div>
          <h4>Hi...</h4>
          <h4>Iam Rifqi-dev</h4>
          <h4>Coming Soon</h4>
          <h4>I'll update this portofolio</h4>
        </div>
      </div>
    </div>
  );
}

export default Intro;
