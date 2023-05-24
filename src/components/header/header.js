import React from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
export default function header() {
  return (
    <nav className="flex items-center justify-around max-w-7xl mx-auto font-medium text-xl h-20">
      <div className="text-2xl font-semibold">Logo</div>
      <div className="space-x-10">
        <Link to={"/"}>Home</Link>
        <Link to={"/categories"}>Categories</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Cart></Cart>
      </div>
      <div className="text-2xl font-medium">Sepet</div>
    </nav>
  );
}
