import React from "react";

function Loading() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-transparent flex-col">
        <div className="box w-12 h-12 bg-[#08fc04] rounded-sm animate-move-jump-spin flex justify-center items-center">
          <div className="box w-8 h-8 bg-black flex justify-center items-center">
            <div className="h-3 w-3  bg-[#08fcfc] m-auto" />
          </div>
        </div>
        <hr className="w-[250px] z-10" />
        <h4 className="text-white z-10 mt-2 font-poppins text-xl">
          Loading
          <span
            className="animate-wave inline-block ml-1"
            style={{ animationDelay: "0s" }}
          >
            .
          </span>
          <span
            className="animate-wave inline-block ml-1"
            style={{ animationDelay: "0.5s" }}
          >
            .
          </span>
          <span
            className="animate-wave inline-block ml-1"
            style={{ animationDelay: "0.9s" }}
          >
            .
          </span>
        </h4>
      </div>
    </div>
  );
}

export default Loading;
