import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Profile from "./Profile";
import Nav from "./Nav";
import About from "./About";
import Work from "./Work";

function Resume() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="container ps-3 md:px-20 md:h-screen h-full grid grid-cols-1 md:grid-cols-20/65/15 gap-6 ">
      <Profile />
      <div
        className=" bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10
 text-white w-full mt-[60px] h-[calc(100%-120px)] "
      >
        <About />
        <Work />
      </div>
      <Nav />
    </div>
  );
}

export default Resume;
