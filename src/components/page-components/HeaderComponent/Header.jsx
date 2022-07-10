import { useRecoilValue } from "recoil";
import { activeUserInfo } from "../../../state/ActiveUserState/selectorActiveUser";

const Header = () => {
  const activeUser = useRecoilValue(activeUserInfo);
  console.log(activeUser);
  return <div>Header</div>;
};

export default Header;
