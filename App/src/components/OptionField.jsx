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

// Styled component for range inputs
const RangeInput = styled.input.attrs({ type: "range" })`
  --thumb-size: 1.5em;
  --track-factor: 0.5;

  --in-duration: var(--transition-md);
  --out-duration: var(--transition-sm);

  --in-function: ease-in;
  --out-function: ease-out;

  block-size: var(--thumb-size);
  inline-size: 100%;

  appearance: none;
  background: unset;
  border: unset;
  outline: unset;
  padding: unset;
  margin: unset;

  &::-webkit-slider-runnable-track {
    block-size: calc(var(--thumb-size) * var(--track-factor));
    inline-size: 100%;

    appearance: none;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.1), inset 0 0 0 1px rgb(0 0 0 / 0.1);
    cursor: pointer;
    background: var(--green-300);
    border-radius: var(--corner-2xs);

    transition: box-shadow var(--out-duration) var(--out-delay) var(--out-function);
  }

  &::-webkit-slider-thumb {
    block-size: var(--thumb-size);
    inline-size: var(--thumb-size);

    appearance: none;
    border-radius: calc(var(--thumb-size) / 2);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.1);
    background: white;
    cursor: ew-resize;
    margin-top: calc((var(--thumb-size) * var(--track-factor) * var(--track-factor)) * -1);

    transition: box-shadow var(--out-duration) var(--out-delay) var(--out-function);
  }

  &:focus {
    outline: none;
  }

  &:hover::-webkit-slider-thumb,
  &:focus::-webkit-slider-thumb {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    transition: box-shadow var(--in-duration) var(--in-delay) var(--in-function);
  }

  &:hover::-webkit-slider-runnable-track,
  &:focus::-webkit-slider-runnable-track {
    background: var(--green-500);
    box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 0.1), inset 0 1px 2px -1px rgb(0 0 0 / 0.1);

    transition: background var(--in-duration) var(--in-delay) var(--in-function),
      box-shadow var(--in-duration) var(--in-delay) var(--in-function);
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
      input = <RangeInput onChange={handleChange} {...props} />;
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
