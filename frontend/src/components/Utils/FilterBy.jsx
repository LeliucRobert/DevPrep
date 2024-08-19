import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/FilterBy.css";
import DropdownDivider from "react-bootstrap/esm/DropdownDivider";
import { useState } from "react";

const FilterBy = ({ type, options, onFilterChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleFilterClick = () => {
    onFilterChange(selectedOptions);
  };

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
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
        ))}

        <Button variant="secondary" size="sm" onClick={handleFilterClick}>
          Filter
        </Button>
      </Form>
    </DropdownButton>
  );
};

export default FilterBy;
