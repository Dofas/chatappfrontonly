import React, { useState } from "react";
import "./groups-list.scss";
import AddDtn from "../../../assets/images/grey-plus.jpg";
import GroupsListItems from "./GroupListItemsComponent/GroupsListItems";
import AddGroupModal from "./AddGroupModalComponent/AddGroupModal";

const GroupsList = ({ groups, socket }) => {
  const [isModal, setIsModal] = useState(null);
  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return (
    <div>
      <div className="group-list-header">
        <span className="title">Groups</span>
        <span
          data-testid="add-group-button"
          className="add-img"
          onClick={openModal}
        >
          <img src={AddDtn} alt="add" className="groups-add-btn-icon" />
        </span>
      </div>
      <GroupsListItems groups={groups} />
      {isModal && (
        <AddGroupModal
          isModal={isModal}
          closeModal={closeModal}
          socket={socket}
        />
      )}
    </div>
  );
};

export default React.memo(GroupsList);
