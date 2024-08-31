import React from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../sidenav/Sidenav";
import "./Layout.css";
function Layout() {
  return (
    <div className="flex flex-col md:flex-row h-screen ">
      <Sidenav />
      <div className="flex-1 min-h-screen md:overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
