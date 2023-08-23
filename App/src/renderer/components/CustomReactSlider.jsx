import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";

import Tippy from "@tippyjs/react";
import { animateFill } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";

const StyledSlider = styled(ReactSlider)`
  block-size: var(--thumb-size);
  inline-size: 100%;
  margin-inline: calc((var(--thumb-size) / 2) * -1);
  width: calc(100% + var(--thumb-size));
`;

const SliderWrapper = styled.div`
  position: relative;
  padding-block-end: 1em;
  margin-inline: auto;
  width: calc(100% - var(--thumb-size));
`;

const SliderThumb = styled.div`
  block-size: var(--thumb-size);
  inline-size: var(--thumb-size);
  line-height: var(--thumb-size);

  text-align: center;
  background-color: var(--body-color);
  color: #fff;
  border-radius: 50%;
  cursor: ew-resize;

  letter-spacing: -0.125ch;
  text-indent: -0.125ch;
  z-index: 2;

  & span {
    display: block;
    font-size: 0.75em;
    transform: scale(1) translateY(0);

    transition: transform var(--notch-transition-duration) var(--notch-transition-delay) var(--notch-transition-function);
  }

  &.active {
    outline: 0.125rem solid var(--green-500);

    & span {
      transform: scale(1) translateY(-1.5rem);
    }
  }
`;

const SliderTrack = styled.div`
  top: var(--track-offset);
  bottom: var(--track-offset);
  background: ${(props) => (props.$index === 2 ? "#f00" : props.$index === 1 ? "linear-gradient(90deg, var(--emerald-600),var(--lime-400))" : "linear-gradient(90deg, var(--amber-500),var(--red-600))")};
  border-radius: 999px;
  cursor: pointer;
`;

const SliderNotch = styled.div`
  position: absolute;
  block-size: var(--notch-size);
  inline-size: var(--notch-size);
  border-radius: calc(var(--notch-size) / 2);
  filter: var(--notch-shadow);
  outline: 0.25rem solid var(--body-contrast);
  outline-offset: calc((var(--notch-size) / 2) * -1);
  transform: translateX(-50%) translateY(calc(((var(--thumb-size) / 2) + (var(--notch-size) / 2)) * -1));
  cursor: pointer;

  scale: var(--notch-scale);
  transform-origin: 0% -78%;
  transition: scale var(--notch-transition-duration) var(--notch-transition-delay) var(--notch-transition-function);
`;

const SliderNotchLabel = styled.div`
  position: absolute;
  transform: translateX(-50%);
  font-size: 0.8rem;
  white-space: nowrap;
  cursor: pointer;

  scale: var(--notch-scale);
  transform-origin: 0% -120%;
  transition: scale var(--notch-transition-duration) var(--notch-transition-delay) var(--notch-transition-function);
`;

const SliderValue = styled.span`
  font-family: var(--font-custom--path), var(--font-system--mono);
  font-weight: 600;
`;

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
          <SliderValue>{state.valueNow}</SliderValue>
          {valueSuffix && valueSuffix}
        </Fragment>
      }
      className='custom-tippy'
      hideOnClick={false}
      trigger='focusin'
      offset={[0, 5]}
      animateFill
      plugins={[animateFill]}>
      <SliderThumb {...props} key={`${id}-thumb`}>
        <SliderValue>{state.valueNow}</SliderValue>
      </SliderThumb>
    </Tippy>
  );

  const Track = (props, state) => <SliderTrack {...props} $index={state.index} />;

  const renderNotches = () => {
    return props.notches.map((notch) => {
      const leftPercentage = ((notch.value - props.min) / (props.max - props.min)) * 100;
      return (
        <Fragment key={`notch-${notch.value}`}>
          <SliderNotch style={{ left: `${leftPercentage}%` }} onClick={() => handleNotchClick(notch.value)} />
          {notch.label && (
            <SliderNotchLabel style={{ left: `${leftPercentage}%` }} onClick={() => handleNotchClick(notch.value)}>
              {notch.label}
            </SliderNotchLabel>
          )}
        </Fragment>
      );
    });
  };

  useEffect(() => {
    // Update the value from localStorage when the component mounts
    setValue(parseInt(localStorage.getItem(id)) || value);
  }, []);

  return (
    <SliderWrapper>
      <StyledSlider value={value} onChange={setValue} {...props} renderTrack={Track} renderThumb={Thumb} />
      {renderNotches()}
    </SliderWrapper>
  );
};

export default CustomReactSlider;
