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
import avatar from "../resources/avatar.png";
import Weather from "./Weather";
import Earthquacke from "./Earthquacke";

function Intro() {
  return (
    <div>
      <div className="flex md:h-screen flex-col justify-center items-center mt-[60px]">
        <div className="flex md:flex-row flex-col  justify-center items-center md:gap-40 gap-10 w-full">
          <div className="flex justify-center md:items-center items-start md:mt-0 mt-10">
            <div
              className=" outline outline-5 outline-slate-100 rounded-full overflow-hidden bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
"
            >
              <img
                className="mb-[-10px] md:w-64 w-52"
                src={avatar}
                alt="avatar"
              />
            </div>
          </div>

          <div className=" flex justify-center items-center flex-col text-white">
            <div className="flex md:items-start items-center flex-col">
              <h2 className=" md:text-[36px] text-[28px] font-poppins tracking-widest">
                Hello{" "}
                <span className="bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">
                  World
                </span>
              </h2>
              <h2 className=" text-center md:text-start  md:text-[36px] text-[24px]  font-poppins tracking-widest">
                I'm Rifqi Firlian Pratama
              </h2>
              <h3 className=" md:text-[18px] text-[14px] font-poppins">
                Fullstack Developer
              </h3>
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
        <div className="text-white flex flex-wrap justify-evenly gap-5 p-10 mt-5 md:mt-16">
          <Weather />
          <Earthquacke />
        </div>
      </div>
    </div>
  );
}

export default Intro;
