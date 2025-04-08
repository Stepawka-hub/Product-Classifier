import { FC } from "react";
import { SidebarUI } from "@ui/sidebar";

export const Sidebar: FC = () => {
  const fillData = () => alert("fill");
  const clearData = () => alert("clear");

  return <SidebarUI fillData={fillData} clearData={clearData} />;
};
