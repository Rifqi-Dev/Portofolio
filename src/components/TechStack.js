import React from "react";
import Weather from "./Weather";
import Earthquacke from "./Earthquacke";
import NeonContainer from "./Neon-container";
import {
  faAngular,
  faBootstrap,
  faCss3Alt,
  faGitAlt,
  faJira,
  faJs,
  faNodeJs,
  faPython,
  faReact,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCloud,
  faCode,
  faDatabase,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

function TechStack() {
  return (
    <div className="text-white px-14 pb-10 font-poppins">
      <h3 className="font-poppins text-3xl text-center">My Skills</h3>

      <div className="flex flex-wrap gap-10 justify-center items-center mt-12">
        <div className="group relative">
          <NeonContainer
            icon={faAngular}
            className="mt-4 aspect-square outline p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            Angular
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faReact}
            className="mt-4 aspect-square outline p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            ReactJS
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faCss3Alt}
            className="mt-4 aspect-square outline p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            CSS3
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faSass}
            className="mt-4 aspect-square outline p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            SCSS
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faJs}
            className="mt-4 outline aspect-square p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            Javascript
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faNodeJs}
            className="mt-4 outline aspect-square p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            NodeJS
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faPython}
            className="mt-4 outline aspect-square p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            Python
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faDatabase}
            className="mt-4 outline aspect-square p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            PostgreeSQL
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faGlobe}
            className="mt-4 outline aspect-square p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            RestAPIs
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faGitAlt}
            className="mt-4 outline aspect-square p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            Git
          </span>
        </div>

        <div className="group relative">
          <NeonContainer
            icon={faJira}
            className="mt-4 outline aspect-square p-2 rounded hover:border-sky-200 transition ease-out
            hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
            hover:text-sky-200"
          />
          <span className="pointer-events-none absolute -top-12 left-0 right-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-slate-100 text-black rounded p-1">
            Jira
          </span>
        </div>
      </div>
    </div>
  );
}

export default TechStack;
