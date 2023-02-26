import { useEffect, useRef, useState } from "react";
import { UserService } from "../UserService/UserService";
import jwt_decode from "jwt-decode";

export function useAuth(userNickName) {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cancelRequest = useRef(false);

  useEffect(() => {
    if (!userNickName) return;

    cancelRequest.current = false;
    (async () => {
      try {
        setIsLoading(true);
        if (!localStorage.getItem("auth")) return;
        const decoded = jwt_decode(localStorage.getItem("auth"));
        const currentDate = new Date();
        if (decoded.exp * 1000 < currentDate.getTime()) {
          await UserService.getRefreshToken();
        }
        const fetchedUser = await UserService.findUser(userNickName);
        if (cancelRequest.current) return;
        if (!fetchedUser?.status) {
          setIsLoading(false);
          setUser(null);
          setIsError(true);
          return;
        }
        setIsLoading(false);
        setUser(fetchedUser);
        setIsError(false);
      } catch (e) {
        if (cancelRequest.current) return;
        console.log(`Error while load user from database ${e.message}`);
        setIsLoading(false);
        setIsError(true);
      }
    })();

    return () => {
      cancelRequest.current = true;
    };
  }, [userNickName]);
  return { user, isLoading, isError };
}
