import "./team-list.scss";
import AddIcon from "../../../assets/images/personAdd.svg";
import React, { useState } from "react";
import AddTeamModal from "./AddTeamModalComponent/AddTeamModal";
import TeamListItems from "./TeamListItemsComponent/TeamListItems";

const TeamsList = ({ teams, activeTeam, setActiveTeam, socket }) => {
  const [isModal, setIsModal] = useState(null);
  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return (
    <div>
      <div className="team-list-header">
        <span className="title">Teams</span>
        <span
          data-testid="add-team-button"
          className="add-img"
          onClick={openModal}
        >
          <img src={AddIcon} alt="add" className="team-add-btn-img" />
        </span>
      </div>
      <TeamListItems
        teams={teams}
        activeTeam={activeTeam}
        setActiveTeam={setActiveTeam}
      />
      {isModal && (
        <AddTeamModal
          isModal={isModal}
          closeModal={closeModal}
          socket={socket}
        />
      )}
    </div>
  );
};

export default React.memo(TeamsList);
