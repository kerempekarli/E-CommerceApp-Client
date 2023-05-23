import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
export default function authenticatedLayout() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}
