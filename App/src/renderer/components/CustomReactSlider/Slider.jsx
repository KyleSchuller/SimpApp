import React, { Fragment, useEffect } from "react";

import Tippy from "@tippyjs/react";
import { animateFill } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";

import { StyledSlider, StyledSliderWrapper, StyledSliderThumb, StyledSliderTrack, StyledSliderNotch, StyledSliderNotchLabel, StyledSliderValue } from "./styles";

const CustomReactSlider = ({ id, value, setValue, tooltipPrefix, valueSuffix, ...props }) => {
  const handleNotchClick = (notchValue) => {
    props.onChange && props.onChange(notchValue);
  };

  const Thumb = (props, state) => (
    <Tippy
      key={`${id}-tippy`}
      content={
        <Fragment>
          {tooltipPrefix && tooltipPrefix}
          <StyledSliderValue>{state.valueNow}</StyledSliderValue>
          {valueSuffix && valueSuffix}
        </Fragment>
      }
      className='custom-tippy'
      hideOnClick={false}
      trigger='focusin'
      offset={[0, 5]}
      animateFill
      plugins={[animateFill]}>
      <StyledSliderThumb {...props} key={`${id}-thumb`}>
        <StyledSliderValue>{state.valueNow}</StyledSliderValue>
      </StyledSliderThumb>
    </Tippy>
  );

  const Track = (props, state) => <StyledSliderTrack {...props} $index={state.index} />;

  const renderNotches = () => {
    return props.notches.map((notch) => {
      const leftPercentage = ((notch.value - props.min) / (props.max - props.min)) * 100;
      return (
        <Fragment key={`notch-${notch.value}`}>
          <StyledSliderNotch style={{ left: `${leftPercentage}%` }} onClick={() => handleNotchClick(notch.value)} />
          {notch.label && (
            <StyledSliderNotchLabel style={{ left: `${leftPercentage}%` }} onClick={() => handleNotchClick(notch.value)}>
              {notch.label}
            </StyledSliderNotchLabel>
          )}
        </Fragment>
      );
    });
  };

  useEffect(() => {
    setValue(parseInt(localStorage.getItem(id)) || value);
  }, []);

  return (
    <StyledSliderWrapper>
      <StyledSlider value={value} onChange={setValue} {...props} renderTrack={Track} renderThumb={Thumb} />
      {renderNotches()}
    </StyledSliderWrapper>
  );
};

export default CustomReactSlider;
