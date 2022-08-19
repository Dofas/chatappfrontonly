import "./active-user.css";
import Star from "../../../assets/images/star.jpg";
import Bell from "../../../assets/images/bell.jpg";
import Question from "../../../assets/images/question.jpg";
import Globe from "../../../assets/images/globe.jpg";

const ActiveUser = ({
  notificationsCount,
  messagesCount,
  userName,
  userAvatar,
}) => {
  return (
    <div className={"active-user-info-container"}>
      <ul>
        <li>
          {!!notificationsCount && (
            <span
              data-testid={"active-user-notification-count"}
              className={"circle color-red"}
            >
              {notificationsCount}
            </span>
          )}
          <img src={Star} alt={"star"} />
        </li>
        <li>
          {!!messagesCount && (
            <span
              data-testid={"active-user-messages-count"}
              className={"circle color-green"}
            >
              {messagesCount}
            </span>
          )}
          <img src={Bell} alt={"bell"} />
        </li>
        <li>
          <img src={Question} alt={"question"} />
        </li>
        <li>
          <img src={Globe} alt={"globe"} />
        </li>
      </ul>
      <div className={"active-user-info-block"}>
        <div title={userName}>{userName}</div>
        <img src={userAvatar} alt={"active-avatar"} />
      </div>
    </div>
  );
};

export default ActiveUser;
