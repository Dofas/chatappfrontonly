import "./nav-bar.css";
import { NavLink } from "react-router-dom";

const NavBar = ({ activeLink, id }) => {
  const memorizedNavBarList = [
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

  return (
    <ul className={"header-nav-bar-container"}>
      {memorizedNavBarList.map((listItem) => (
        <li key={listItem.key}>
          <NavLink
            to={listItem.path}
            className={
              activeLink === listItem.key ? "active-header-nav-bar-link" : ""
            }
          >
            {listItem.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
