import React from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, light, thin, duotone, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const FormGroup = styled.div`
  /* --color: ${(props) => (props.$color ? props.$color : "currentColor")}; */
  display: grid;
  gap: 0.25em;

  & label {
    margin-inline-end: auto;
  }
`;

const OptionField = ({ fields, type, label, description, id = Math.random().toString(36).substring(7), ...props }) => {
  const handleChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    window.electron.replaceValueInFile(fields, value);
  };

  let input;
  switch (type) {
    case "range":
      input = <input type='range' onChange={handleChange} {...props} />;
      break;
    case "select":
      // Assuming `props.options` is an array of options for the select
      input = (
        <select onChange={handleChange} {...props}>
          {props.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case "checkbox":
      input = <input type='checkbox' onChange={handleChange} {...props} />;
      break;
    default:
      throw new Error(`Unsupported type: ${type}`);
  }

  const formGroup = (
    <FormGroup>
      {label && <label htmlFor={id}>{label}</label>}
      {React.cloneElement(input, { id })}
    </FormGroup>
  );

  return description ? (
    <Tippy content={description} className='custom-tippy'>
      {formGroup}
    </Tippy>
  ) : (
    formGroup
  );
};

export default OptionField;
