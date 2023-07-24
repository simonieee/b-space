import React from "react";
import { Header } from "../../Components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
