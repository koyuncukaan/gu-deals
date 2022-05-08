import React from "react";
import logo from "../assets/logo.png";

function Nav() {
  return (
    <header className="text-gray-600 body-font bg-slate-100">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <a className="flex items-center mb-4 font-medium text-slate-900 title-font md:mb-0">
          <img className="w-10 h-10" src={logo} alt="logo" />
          <span className="ml-3 text-xl">GU Deals</span>
        </a>
      </div>
    </header>
  );
}

export default Nav;
