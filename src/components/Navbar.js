import React from "react";
import logo from "../assets/logo.png";
import ethLogo from "../assets/ethLogo.png";
import { useGlobalContext } from "../context";

function Nav() {
  const { coinPrices } = useGlobalContext();
  return (
    <header className="text-slate-50 body-font bg-slate-800">
      <div className="container flex flex-col flex-wrap items-center justify-between p-5 mx-auto md:flex-row">
        <a className="flex items-center mb-4 font-medium title-font md:mb-0">
          <img className="w-10 h-10" src={logo} alt="logo" />
          <span className="ml-3 text-2xl">GU Deals</span>
        </a>
        <p className="flex flex-col justify-center font-normal">
          <p className="flex justify-end">
            ${coinPrices.eth}
            <img className="ml-2" src={ethLogo} alt="eth" />
          </p>
          <p className="flex justify-end mt-4">
            ${coinPrices.gods}
            <img className="ml-2 w-7 h-7" src={logo} alt="logo" />
          </p>
        </p>
      </div>
    </header>
  );
}

export default Nav;
