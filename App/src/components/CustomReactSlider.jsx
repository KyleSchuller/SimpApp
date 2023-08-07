import React, { Fragment, useState, useRef } from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";
import Tippy from "@tippyjs/react";
import { animateFill } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";

const SliderContainer = styled.div`
  --thumb-size: 1.75rem;
  --track-offset: 0.375rem;

  position: relative;
  padding-block-end: 1em;
  margin-inline: auto;
  width: calc(100% - var(--thumb-size));
`;

const StyledSlider = styled(ReactSlider)`
  block-size: var(--thumb-size);
  inline-size: 100%;
  margin-inline: calc((var(--thumb-size) / 2) * -1);
  width: calc(100% + var(--thumb-size));
`;

const StyledThumb = styled.div`
  block-size: var(--thumb-size);
  inline-size: var(--thumb-size);
  line-height: var(--thumb-size);

  text-align: center;
  background-color: var(--body-color);
  color: #fff;
  border-radius: 50%;
  cursor: ew-resize;

  font-family: var(--font-custom--path), var(--font-system--mono);
  font-weight: 600;
  letter-spacing: -0.125ch;
  text-indent: -0.125ch;

  & span {
    display: block;
    font-size: 0.75em;
    transform: scale(1) translateY(0);

    transition: transform var(--transition-sm) var(--transition-none) var(--in-function);
  }

  &.active {
    outline: 0.125rem solid var(--green-500);

    & span {
      transform: scale(1) translateY(-1.5rem);
    }
  }
`;

const StyledTrack = styled.div`
  top: var(--track-offset);
  bottom: var(--track-offset);
  background: ${(props) =>
    props.$index === 2
      ? "#f00"
      : props.$index === 1
      ? "linear-gradient(90deg, var(--emerald-600),var(--lime-400))"
      : "linear-gradient(90deg, var(--amber-500),var(--red-600))"};
  border-radius: 999px;
  cursor: pointer;
`;

const CurrentValue = styled.span`
  font-family: var(--font-custom--path), var(--font-system--mono);
  font-weight: 600;
`;

const Notch = styled.div`
  position: absolute;
  width: 0.125em;
  height: 0.5em;
  background-color: #000;
  transform: translateX(-50%);
  cursor: pointer;
`;

const NotchLabel = styled.div`
  position: absolute;
  transform: translateX(-50%) translateY(50%);
  font-size: 0.8rem;
  white-space: nowrap;
  cursor: pointer;
`;

const CustomReactSlider = ({ value, setValue, tooltipPrefix, tooltipSuffix, ...props }) => {
  const handleNotchClick = (notchValue) => {
    props.onChange && props.onChange(notchValue);
  };

  const Thumb = (props, state) => (
    <Tippy
      content={
        <Fragment>
          {tooltipPrefix && tooltipPrefix}
          <CurrentValue>{state.valueNow}</CurrentValue>
          {tooltipSuffix && tooltipSuffix}
        </Fragment>
      }
      className='custom-tippy'
      hideOnClick={false}
      trigger='focusin'
      offset={[0, 5]}
      animateFill
      plugins={[animateFill]}>
      <StyledThumb {...props}>
        <span>{state.valueNow}</span>
      </StyledThumb>
    </Tippy>
  );

  const Track = (props, state) => <StyledTrack {...props} $index={state.index} />;

  const renderNotches = () => {
    return props.notches.map((notch) => {
      const leftPercentage = ((notch.value - props.min) / (props.max - props.min)) * 100;
      return (
        <Fragment key={`notch-${notch.value}`}>
          <Notch style={{ left: `${leftPercentage}%` }} onClick={() => handleNotchClick(notch.value)} />
          {notch.label && (
            <NotchLabel style={{ left: `${leftPercentage}%` }} onClick={() => handleNotchClick(notch.value)}>
              {notch.label}
            </NotchLabel>
          )}
        </Fragment>
      );
    });
  };

  return (
    <SliderContainer>
      <StyledSlider
        value={value} // Use the passed value prop
        onChange={setValue} // Use the passed setValue prop to update the value
        {...props}
        renderTrack={Track}
        renderThumb={Thumb}
      />
      {renderNotches()}
    </SliderContainer>
  );
};

export default CustomReactSlider;
