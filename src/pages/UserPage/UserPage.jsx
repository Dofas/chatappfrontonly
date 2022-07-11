import { useEffect } from "react";
import "./user-page.css";
import Header from "../../components/page-components/HeaderComponent/Header";
import { useParams } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";
import { useSetRecoilState } from "recoil";
import { activeUser } from "../../state/activeUserState/atomActiveUser";

const UserPage = ({ activeLink }) => {
  const { id } = useParams();

  const setActiveUser = useSetRecoilState(activeUser);

  const { user, isLoading, isError } = useAuth(id);

  useEffect(() => {
    if (user && !isError) {
      setActiveUser(user);
    } else {
      setActiveUser("");
    }
  }, [user, isError]);

  const userContent = user ? (
    <>
      <Header activeLink={activeLink} />
      <div data-testid={"user-page-content-data-id"}>UserPage</div>
    </>
  ) : (
    <div className={"user-page-load-error"}>User doesnt exist</div>
  );

  return isLoading ? <Spinner /> : userContent;
};

export default UserPage;
