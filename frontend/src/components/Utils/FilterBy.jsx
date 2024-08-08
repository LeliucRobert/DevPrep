import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/FilterBy.css";
import DropdownDivider from "react-bootstrap/esm/DropdownDivider";

const FilterBy = ({ type, options }) => {
  return (
    <DropdownButton id="dropdown-basic-button" title={type}>
      <Dropdown.ItemText>{type}</Dropdown.ItemText>
      <DropdownDivider />
      <Form className="filter-button">
        {options.map((option, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            id={`checkbox-${index}`}
            label={option}
          />
        ))}

        <Button variant="secondary" size="sm">
          Filter
        </Button>
      </Form>
    </DropdownButton>
  );
};

export default FilterBy;
