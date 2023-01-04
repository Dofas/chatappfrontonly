import React from "react";
import Menu from "./MenuComponent/Menu";
import SearchBar from "./SerachBarComponent/SearchBar";
import "./user-list-header.scss";
import { useSetRecoilState } from "recoil";
import { sidebarState } from "../../../state/responsiveState/atomSideBarState";

const UserListHeader = () => {
  const setIsSidebar = useSetRecoilState(sidebarState);

  const changeSidebarState = () => {
    setIsSidebar((prev) => !prev);
  };

  return (
    <div className="user-list-header-container">
      <div className="sidebar-toggle" onClick={changeSidebarState}>
        <span className="arrow-left">&#8592;</span>
        <span>Open channel list</span>
      </div>
      <SearchBar />
      <Menu />
    </div>
  );
};

export default UserListHeader;
