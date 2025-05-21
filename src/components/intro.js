import React, { useCallback, useState } from "react";
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
import Weather from "./Weather";
import Earthquacke from "./Earthquacke";
import VisitorCount from "./VisitorCount";

function Intro() {
  return (
    <div>
      <div
        className="flex  md:h-screen flex-col justify-center items-center"
        id="home"
      >
        <div className="flex md:flex-row flex-col  justify-center items-center lg:gap-40 md:gap-5 gap-10 w-full mt-[60px] px-5">
          <div className="flex justify-center md:items-center items-start md:mt-0 mt-10">
            <div
              className=" outline outline-5 outline-slate-100 rounded-full overflow-hidden bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
"
            >
              <img
                className="mb-[-10px] lg:w-64 w-52"
                src="https://storage.kapuyuaxdev.my.id/personal-website/avatar.png"
                alt="avatar"
                loading="lazy"
              />
            </div>
          </div>

          <div className=" flex justify-center items-center flex-col text-white z-10">
            <div className="flex md:items-start items-center flex-col">
              <h2 className=" lg:text-[36px] text-[28px] font-poppins tracking-widest">
                Hello{" "}
                <span className="bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">
                  World
                </span>
              </h2>
              <h2 className=" text-center md:text-start  lg:text-[36px] text-[24px]  font-poppins tracking-widest">
                I'm Rifqi Firlian Pratama
              </h2>
              <h3 className=" lg:text-[18px] text-[14px] font-poppins">
                <span className="bg-red-800 p-1 rounded-md hover:bg-white hover:text-red-800 transition-all ease-in-out duration-300">
                  Software
                </span>{" "}
                Engineer
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
        <div className="container m-10 px-5 md:px-32 mt-24">
          <VisitorCount />
        </div>
      </div>
    </div>
  );
}

export default Intro;
