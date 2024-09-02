import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useCompletionContext } from "../../context/CompletionContext";

function ExpertSelect2({ options, selectedOptions, handleSelectedPermission }) {
  const { selectedSkill } = useCompletionContext();
  const animatedComponents = makeAnimated();
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isOptionDisabled={() =>
        selectedSkill.length > 6
      }
      value={selectedOptions}
      onChange={handleSelectedPermission}
      isMulti
      options={options}
    />
  );
}

export default ExpertSelect2;
