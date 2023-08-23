import React, { useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, light, thin, duotone, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Tippy from "@tippyjs/react";

import CustomReactSlider from "./CustomReactSlider.jsx";

const FormGroup = styled.div`
  --notch-size: 1rem;
  --notch-scale: 0;
  --notch-shadow: drop-shadow(0 0 0 rgb(0 0 0 / 0)) drop-shadow(0 0 0 rgb(0 0 0 / 0));
  --notch-transition-duration: var(--transition-sm);
  --notch-transition-delay: var(--out-delay);
  --notch-transition-function: var(--out-function);
  --thumb-size: 1.75rem;
  --track-offset: 0.375rem;

  display: flex;
  flex-wrap: wrap;
  gap: 0.25em 0.5em;

  & *:not(:last-child) {
    margin-block-end: unset;
  }

  &:hover,
  &:focus-within {
    --notch-scale: 1;
    --notch-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / 0.14)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.12));
    --notch-transition-duration: var(--transition-xs);
    --notch-transition-delay: var(--in-delay);
    --notch-transition-function: var(--in-function);
  }
`;

const OptionField = ({ fields, label, description, extraDetails, tooltipPrefix, valueSuffix, notches, id = Math.random().toString(36).substring(7), ...props }) => {
  // Load initial state from localStorage or set default
  const [sliderValue, setSliderValue] = React.useState(parseInt(localStorage.getItem(id)) || props.defaultValue);

  useEffect(() => {
    // Save to localStorage whenever state changes
    localStorage.setItem(id, sliderValue);
  }, [sliderValue]);

  const handleChange = (value) => {
    setSliderValue(value);
    window.electron.replaceValueInFile(fields, value);
  };

  return (
    <FormGroup>
      <label id={id} className='h5'>
        {label}
      </label>
      <Tippy key={`${id}-extraTippy`} content={extraDetails} className='custom-tippy'>
        <FontAwesomeIcon icon={icon({ name: "info-circle", style: "regular" })} style={{ marginBlock: "auto" }} />
      </Tippy>
      <p>{description}</p>
      <CustomReactSlider ariaLabelledby={id} onChange={handleChange} value={sliderValue} setValue={setSliderValue} min={props.min} max={props.max} step={props.step} defaultValue={props.defaultValue} tooltipPrefix={tooltipPrefix} valueSuffix={valueSuffix} notches={notches} />
    </FormGroup>
  );
};

export default OptionField;
