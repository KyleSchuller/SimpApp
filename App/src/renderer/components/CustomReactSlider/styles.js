import styled from "styled-components";

import ReactSlider from "react-slider";

export const StyledSlider = styled(ReactSlider)`
  block-size: var(--thumb-size);
  inline-size: 100%;
  margin-inline: calc((var(--thumb-size) / 2) * -1);
  width: calc(100% + var(--thumb-size));
`;

export const StyledSliderWrapper = styled.div`
  position: relative;
  padding-block-end: 1em;
  margin-inline: auto;
  width: calc(100% - var(--thumb-size));
`;

export const StyledSliderThumb = styled.div`
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

export const StyledSliderTrack = styled.div`
  top: var(--track-offset);
  bottom: var(--track-offset);
  background: ${(props) => (props.$index === 2 ? "#f00" : props.$index === 1 ? "linear-gradient(90deg, var(--emerald-600),var(--lime-400))" : "linear-gradient(90deg, var(--amber-500),var(--red-600))")};
  border-radius: 999px;
  cursor: pointer;
`;

export const StyledSliderNotch = styled.div`
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

export const StyledSliderNotchLabel = styled.div`
  position: absolute;
  transform: translateX(-50%);
  font-size: 0.8rem;
  white-space: nowrap;
  cursor: pointer;

  scale: var(--notch-scale);
  transform-origin: 0% -120%;
  transition: scale var(--notch-transition-duration) var(--notch-transition-delay) var(--notch-transition-function);
`;

export const StyledSliderValue = styled.span`
  font-family: var(--font-custom--path), var(--font-system--mono);
  font-weight: 600;
`;
