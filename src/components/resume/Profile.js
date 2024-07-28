import React from "react";
import avatar from "../../resources/avatar.png";
import NeonContainer from "../Neon-container";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Profile() {
  return (
    <div
      className=" rounded-lg bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
 text-white w-full h-fit p-8 mt-[60px]"
    >
      <div
        className="mx-auto w-28 h-28 outline outline-1 outline-slate-100 rounded-full overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100
"
      >
        <img className="mb-[-10px]" src={avatar} alt="avatar" loading="lazy" />
      </div>
      <div className="flex flex-col items-center mt-5 ">
        <h2 className="text-xl font-bold font-poppins">
          Rifqi Firlian Pratama
        </h2>
        <h4 className="text-sm mt-1 font-poppins">Fullstack Developer</h4>

        <div className="flex gap-4 scale-75 -mt-1">
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
        {/* <button className="mt-7 outline outline-1 p-3 rounded bg-[#101112]">
          <FontAwesomeIcon icon={faDownload} /> Download CV
        </button> */}
      </div>
    </div>
  );
}

export default Profile;
