import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownDivider from "react-bootstrap/esm/DropdownDivider";

const SortBy = ({ onSortChange }) => {
  const handleSort = (sortType) => {
    onSortChange(sortType);
  };

  return (
    <DropdownButton id="dropdown-item-button" title="Sort By">
      <Dropdown.ItemText>Sort By</Dropdown.ItemText>
      <DropdownDivider />
      <Dropdown.Item as="button" onClick={() => handleSort("newest")}>
        Newest
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => handleSort("oldest")}>
        Oldest
      </Dropdown.Item>

      <Dropdown.Item as="button" onClick={() => handleSort("level-asc")}>
        Level - Ascending
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => handleSort("level-desc")}>
        Level - Descending
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default SortBy;
