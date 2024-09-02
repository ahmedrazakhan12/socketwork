import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useCompletionContext } from "../../context/CompletionContext";

function Select2({ options, selectedOptions, handleSelectedPermission }) {
  const { selectedSkill } = useCompletionContext();
  const animatedComponents = makeAnimated();
  console.log(selectedOptions, selectedSkill, " selected-opts");
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isOptionDisabled={() =>
        selectedSkill.length > 6 || selectedOptions.length > 6
      }
      value={selectedOptions}
      onChange={handleSelectedPermission}
      isMulti
      options={options}
    />
  );
}

export default Select2;
