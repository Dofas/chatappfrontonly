import jwt_decode from "jwt-decode";

const useRole = () => {
  let isManager;
  const token = localStorage.getItem("auth");
  const user = jwt_decode(token);

  if (user.role === "Manager") {
    isManager = true;
  } else {
    isManager = false;
  }

  console.log("isManager: ", isManager);
  return { isManager };
};

export default useRole;
