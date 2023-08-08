import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, light, thin, duotone, icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Tippy from "@tippyjs/react";

import CustomReactSlider from "./CustomReactSlider.jsx";

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em 0.5em;

  & *:not(:last-child) {
    margin-block-end: unset;
  }
`;

const OptionField = ({
  fields,
  label,
  description,
  extraDetails,
  tooltipPrefix,
  valueSuffix,
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
      <Tippy key={`${id}-extraTippy`} content={extraDetails} className='custom-tippy'>
        <FontAwesomeIcon icon={icon({ name: "info-circle", style: "solid" })} style={{ marginBlock: "auto" }} />
      </Tippy>
      <p>{description}</p>
      <CustomReactSlider
        ariaLabelledby={id}
        onChange={handleChange}
        value={sliderValue}
        setValue={setSliderValue}
        min={props.min}
        max={props.max}
        defaultValue={props.defaultValue}
        tooltipPrefix={tooltipPrefix}
        valueSuffix={valueSuffix}
        notches={notches}
      />
    </FormGroup>
  );
};

export default OptionField;
