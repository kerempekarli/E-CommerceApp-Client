import React from "react";
import { Link } from "react-router-dom";
export default function header() {
  return (
    <nav className="flex items-center justify-center font-medium text-2xl h-20 space-x-16">
      <Link to={"/"}>Home</Link>
      <Link to={"/categories"}>Categories</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/contact"}>Contact</Link>
    </nav>
  );
}
