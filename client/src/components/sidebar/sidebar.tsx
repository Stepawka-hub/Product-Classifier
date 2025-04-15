import { FC } from "react";
import { SidebarUI } from "@ui/sidebar";
import { useDispatch } from '@store';
import { clearDataAsync, fillDataAsync } from '@thunks/app';

export const Sidebar: FC = () => {
  const dispatch = useDispatch();
  
  const fillData = () => {
    dispatch(fillDataAsync());
  };

  const clearData = () => {
    dispatch(clearDataAsync());
  }

  return <SidebarUI fillData={fillData} clearData={clearData} />;
};
