import { useEffect, useRef, useState } from "react";
import { UserService } from "../UserService/UserService";

export function useAuth(userId) {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cancelRequest = useRef(false);

  useEffect(() => {
    if (!userId) return;

    cancelRequest.current = false;
    (async () => {
      try {
        setIsLoading(true);
        const fetchedUser = await UserService.findUser(userId);
        if (cancelRequest.current) return;
        setIsLoading(false);
        setUser(fetchedUser);
        setIsError(false);
      } catch (e) {
        if (cancelRequest.current) return;
        setIsError(true);
      }
    })();

    return () => {
      cancelRequest.current = true;
    };
  }, [userId]);
  return { user, isLoading, isError };
}
