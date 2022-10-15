import "./nav-bar.css";
import React, { useMemo, useState } from "react";
import NavBarItem from "./NavBarItem";
import { useCalculateWindowSize } from "../../../utils/hooks/useCalculateWindowSize";

const NavBar = ({ activeLink, id }) => {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("header-nav-bar-container hidden");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { innerWidth } = useCalculateWindowSize();

  const memorizedNavBarList = useMemo(() => {
    return [
      {
        text: "All Projects",
        path: `/chatapp/messages/${id}`,
        key: "allProjects",
      },
      { text: "Teams", path: `/chatapp/messages/${id}`, key: "teams" },
      { text: "Messages", path: `/chatapp/messages/${id}`, key: "messages" },
      {
        text: "Statistics",
        path: `/chatapp/messages/${id}`,
        key: "statistics",
      },
      { text: "Search", path: `/chatapp/messages/${id}`, key: "search" },
    ];
  }, [id]);

  const updateMenu = () => {
    if (!isMenuOpen) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("header-nav-bar-container visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("header-nav-bar-container hidden");
    }

    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="burger-menu" onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
      <ul className={innerWidth > 790 ? "header-nav-bar-container" : menuClass}>
        {memorizedNavBarList.map((listItem) => (
          <NavBarItem
            key={listItem.key}
            activeLink={activeLink}
            itemLink={listItem.key}
            itemPath={listItem.path}
            itemText={listItem.text}
          />
        ))}
      </ul>
    </>
  );
};

export default NavBar;
