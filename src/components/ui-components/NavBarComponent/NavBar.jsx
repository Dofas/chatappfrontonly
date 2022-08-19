import "./nav-bar.css";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";

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
        <li
          className={
            activeLink === listItem.key ? "active-header-nav-bar-link" : ""
          }
          key={listItem.key}
        >
          <NavLink to={listItem.path}>{listItem.text}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
