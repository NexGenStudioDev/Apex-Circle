import React from "react";
import SideBar from "../SideBar/v1/Section/SideBar";
import { getTheme } from "../../config/them.config";
import { Outlet } from "react-router";

const LoginUserTemplate = () => {
  let theme = getTheme("light");

  return (
    <div
      className="dashboard-page flex  w-screen h-screen"
      style={{ background: theme.background.secondary }}
    >
      <SideBar />

      <div className="dashboard-content flex flex-row h-full bg-green-200 w-[83%]">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginUserTemplate;
