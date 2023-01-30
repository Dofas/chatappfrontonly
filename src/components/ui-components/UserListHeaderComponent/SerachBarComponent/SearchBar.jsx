import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userSearchValue } from "../../../../state/activeUserListState/atomActiveUserListState";
import { useClickOutside } from "../../../../utils/hooks/useClickOutside";
import { activeChannel } from "../../../../state/activeChannelState/atomActiveChannelState";
import SearchIcon2 from "../../../../assets/images/searchBtn.svg";

const SearchBar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const closeSearching = () => setIsSearching(false);
  const ref = useClickOutside(closeSearching);
  const teamName = useRecoilValue(activeChannel);
  const [searchValue, setSearchValue] = useRecoilState(userSearchValue);

  const handleChangeInputValue = (event) => {
    setSearchValue(event.target.value);
  };

  const triggerSearching = () => {
    setIsSearching(!isSearching);
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") closeSearching();
  };

  return (
    <div className="user-list-search-container" ref={ref}>
      {isSearching ? (
        <input
          className="user-list-search-input"
          data-testid="user-list-search-input"
          autoFocus={true}
          value={searchValue}
          onChange={handleChangeInputValue}
          onKeyUp={onKeyUp}
        />
      ) : (
        <span className="title" onClick={triggerSearching}>
          {searchValue.length ? searchValue : `List of ${teamName.name}`}
        </span>
      )}
      <img
        className="user-list-search-img"
        data-testid="user-list-search-icon"
        src={SearchIcon2}
        alt="search"
        onClick={triggerSearching}
      />
    </div>
  );
};

export default SearchBar;
