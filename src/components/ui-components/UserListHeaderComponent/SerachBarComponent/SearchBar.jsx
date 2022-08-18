import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userSearchValue } from "../../../../state/activeUserListState/atomActiveUserListState";
import { useClickOutside } from "../../../../utils/hooks/useClickOutside";
import { activeChannel } from "../../../../state/activeChannelState/atomActiveChannelState";
import SearchIcon from "../../../../assets/images/searchBtn.svg";

const SearchBar = () => {
  const [ref, isSearching, setIsSearching] = useClickOutside(false);
  const teamName = useRecoilValue(activeChannel);
  const [searchValue, setSearchValue] = useRecoilState(userSearchValue);

  const handleChangeInputValue = (event) => {
    setSearchValue(event.target.value);
  };

  const startEditing = () => {
    setIsSearching(true);
  };

  const onPressEnter = (e) => {
    if (e.charCode === 13) setIsSearching(false);
  };

  return (
    <div className={"user-list-search-container"}>
      {isSearching ? (
        <input
          className={"user-list-search-input"}
          data-testid={"user-list-search-input"}
          ref={ref}
          autoFocus={true}
          value={searchValue}
          onChange={handleChangeInputValue}
          onKeyPress={onPressEnter}
        />
      ) : (
        <span className={"title"} onClick={startEditing}>
          {searchValue.length ? searchValue : `List of ${teamName}`}
        </span>
      )}
      <span className={"user-list-search-btn"} onClick={startEditing}>
        <img
          className={"user-list-search-img"}
          data-testid={"user-list-search-icon"}
          src={SearchIcon}
          alt={"search"}
        />
      </span>
    </div>
  );
};

export default SearchBar;
