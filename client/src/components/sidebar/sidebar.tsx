import { FC } from "react";
import { SidebarUI } from "@ui/sidebar";
import { useDispatch } from '@store';
import { fillDataAsync } from '@thunks/app';

export const Sidebar: FC = () => {
  const dispatch = useDispatch();
  
  const fillData = () => {
    dispatch(fillDataAsync());
  };

  const clearData = () => alert("clear");

  return <SidebarUI fillData={fillData} clearData={clearData} />;
};
