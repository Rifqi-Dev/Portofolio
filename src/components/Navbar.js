import React from "react";

function Navbar() {
  return (
    <div
      className="sticky top-0 w-full min-h-[60px] z-50  
"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center gap-2">
          <a className="bg-slate-50 bg-opacity-10 p-2" href="#home">
            Home
          </a>
          <a className="bg-slate-50 bg-opacity-10 p-2" href="#skills">
            Skills
          </a>
          <a className="bg-slate-50 bg-opacity-10 p-2" href="#project">
            Projects
          </a>
          <a className="bg-slate-50 bg-opacity-10 p-2" href="#contact">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
