import React from "react";
import Menu from "./MenuComponent/Menu";
import SearchBar from "./SerachBarComponent/SearchBar";
import "./user-list-header.css";

const UserListHeader = () => {
  return (
    <div className={"user-list-header-container"}>
      <SearchBar />
      <Menu />
    </div>
  );
};

export default UserListHeader;
