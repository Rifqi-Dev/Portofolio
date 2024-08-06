import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Nav from "./Nav";
import About from "./About";
import Work from "./Work";
import Education from "./Education";
function Resume() {
  const [state, setState] = useState("about");

  const profile = {
    about: <About />,
    work: <Work />,
    education: <Education />,
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="relative px-5 lg:px-32 md:px-9 pt-12 pb-20">
      <h3 className="text-center font-poppins text-[36px] font-bold pt-4 mb-12">
        Resume
      </h3>
      <div className="my-2">
        <About />
      </div>
      <div className="my-2">
        <Work />
      </div>

      {/* <div className="container  md:px-20  grid grid-cols-1 md:grid-cols-15/85 gap-6 m-auto">
        <Nav setState={setState} state={state} />
        <div className=" w-full">{profile[state]}</div>
      </div> */}
    </div>
  );
}

export default Resume;
