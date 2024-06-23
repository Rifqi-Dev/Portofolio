import dayjs from "dayjs";
import React from "react";

function Footer() {
  return (
    <footer className=" font-poppins text-xs text-center  py-2 w-full bg-white bg-opacity-10">
      Copyright &copy; {dayjs().year()} Kapuyuax-dev
    </footer>
  );
}

export default Footer;
