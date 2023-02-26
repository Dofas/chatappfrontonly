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
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegiterPage/RegisterPage";

const AppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const AppRoutes = ({ socket }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<AppLayout />}>
          <Route index element={<Navigate to={"/chatapp/register"} />} />
          <Route
            path={"/chatapp/messages/:id"}
            element={<UserPage socket={socket} activeLink={"messages"} />}
          />
        </Route>
        <Route
          path={"/chatapp/login"}
          element={<LoginPage socket={socket} />}
        />
        <Route
          path={"/chatapp/register"}
          element={<RegisterPage socket={socket} />}
        />
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
