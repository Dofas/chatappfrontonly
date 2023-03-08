import jwt_decode from "jwt-decode";

const useRole = () => {
  let isManager;
  const token = localStorage.getItem("auth");

  if (token) {
    const user = jwt_decode(token);
    isManager = user?.role === "Manager";
  }

  return { isManager };
};

export default useRole;
