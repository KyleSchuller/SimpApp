import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, light, thin, duotone, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Tippy from "@tippyjs/react";

import CustomReactSlider from "./CustomReactSlider.jsx";

const FormGroup = styled.div`
  display: grid;
  gap: 0.25em;

  & *:not(:last-child) {
    margin-block-end: unset;
  }
  & label {
    margin-inline-end: auto;
  }
`;

const OptionField = ({
  fields,
  label,
  description,
  tooltipPrefix,
  tooltipSuffix,
  notches,
  id = Math.random().toString(36).substring(7),
  ...props
}) => {
  const [sliderValue, setSliderValue] = React.useState(props.defaultValue);

  const handleChange = (value) => {
    setSliderValue(value);
    window.electron.replaceValueInFile(fields, value);
  };

  return (
    <FormGroup>
      <label id={id} className='h5'>
        {label}
      </label>
      <p>{description}</p>
      <CustomReactSlider
        ariaLabelledby={id}
        onChange={handleChange}
        value={sliderValue} // Pass the sliderValue as a prop
        setValue={setSliderValue} // Pass the setSliderValue function as a prop
        min={props.min}
        max={props.max}
        defaultValue={props.defaultValue}
        tooltipPrefix={tooltipPrefix}
        tooltipSuffix={tooltipSuffix}
        notches={notches}
      />
    </FormGroup>
  );
};

export default OptionField;
