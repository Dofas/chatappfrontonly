import "./nav-bar.css";
import { useMemo } from "react";
import NavBarItem from "./NavBarItem";

const NavBar = ({ activeLink, id }) => {
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

  return (
    <ul className="header-nav-bar-container">
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
  );
};

export default NavBar;
