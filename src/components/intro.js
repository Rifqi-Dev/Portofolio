import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import template from "../utils/poligon-particles.json";
import NeonContainer from "./Neon-container";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
function Intro() {
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
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
          <h4>Iam Rifqi-dev [Kapuyuax Dev]</h4>
          <h4>This Still Development</h4>
          <h4 className="mb-5">
            I'll update this portofolio{" "}
            <span className=" font-extrabold">Later</span>
          </h4>
          <div className="flex gap-4">
            <NeonContainer
              url="https://www.linkedin.com/in/rifqi-firlian/"
              icon={faLinkedin}
              className="mt-4 outline p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
            />
            <NeonContainer
              url="https://github.com/rifqi-dev"
              icon={faGithub}
              className="mt-4 outline p-2 rounded hover:border-purple-500 transition ease-out
            hover:shadow-[0_0_2px_#a855f7,inset_0_0_2px_#a855f7,0_0_5px_#a855f7,0_0_15px_#a855f7,0_0_30px_#a855f7]
            hover:text-purple-500"
            />

            <NeonContainer
              url="mailto: firlianrifqi22@gmail.com"
              icon={faEnvelope}
              className=" mt-4 outline p-2 rounded hover:border-green-200 transition ease-out
            hover:shadow-[0_0_2px_#bbf7d0,inset_0_0_2px_#bbf7d0,0_0_5px_#bbf7d0,0_0_15px_#bbf7d0,0_0_30px_#bbf7d0]
            hover:text-green-200"
            />

            <NeonContainer
              url="https://instagram.com/rifqi.firlian"
              icon={faInstagram}
              className=" mt-4 outline p-2 rounded hover:border-red-200 transition ease-out
            hover:shadow-[0_0_2px_#FF0000,inset_0_0_2px_#FF0000,0_0_5px_#FF0000,0_0_15px_#FF0000,0_0_30px_#FF0000]
            hover:text-red-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
