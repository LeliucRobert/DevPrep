import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownDivider from "react-bootstrap/esm/DropdownDivider";

const SortBy = () => {
  return (
    <DropdownButton id="dropdown-item-button" title="Sort By">
      <Dropdown.ItemText>Sort By</Dropdown.ItemText>
      <DropdownDivider />
      <Dropdown.Item as="button">Action</Dropdown.Item>
      <Dropdown.Item as="button">Another action</Dropdown.Item>
      <Dropdown.Item as="button">Something else</Dropdown.Item>
    </DropdownButton>
  );
};

export default SortBy;
