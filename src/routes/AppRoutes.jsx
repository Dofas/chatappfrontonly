import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import UserPage from "../pages/UserPage/UserPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const AppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<AppLayout />}>
          <Route
            index
            element={<Navigate to={"/chatapp/messages/user1_id"} />}
          />
          <Route
            path={"/chatapp/messages/:id"}
            element={<UserPage activeLink={"messages"} />}
          />
        </Route>
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
