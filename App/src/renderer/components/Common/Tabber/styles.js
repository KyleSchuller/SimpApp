// styles.js
import styled from "styled-components";

export const StyledTabberContainer = styled.div`
  --tab-corner: 0.75em;

  display: flex;
  flex-wrap: wrap;
  gap: 0.25em 0.5em;

  & > * {
    margin: unset;
  }

  & *:not(:last-child) {
    margin-block-end: unset;
  }
`;

export const StyledTabberWrapper = styled.div`
  min-width: 100%;
  margin-block-start: 0.25em;
`;

export const StyledTabberNavi = styled.div`
  display: flex;
  gap: 1px;
  align-items: stretch;
  background-color: var(--stone-300);
  border-radius: var(--tab-corner) var(--tab-corner) 0 0;
`;

export const StyledTabberNaviButton = styled.button`
  flex: 1;
  margin: unset;
  padding: 0.5em;
  background-color: ${(props) => (props.$isActive ? "var(--stone-100)" : "var(--stone-200)")};
  border: unset;
  border-radius: unset;
  outline: unset !important;
  cursor: pointer;

  &:first-child {
    border-radius: calc(var(--tab-corner) - 1px) 0 0 0;
  }
  &:last-child {
    border-radius: 0 calc(var(--tab-corner) - 1px) 0 0;
  }
  &:focus-visible {
    background-color: var(--stone-100);
    color: var(--blue-500);
    outline: 1px solid currentColor !important;
    outline-offset: -1px;
    z-index: 1;
  }
`;

export const StyledTabberDescription = styled.div`
  min-width: 100%;
`;

export const StyledTabContent = styled.div`
  background-color: var(--stone-100);
  border-radius: 0 0 var(--tab-corner) var(--tab-corner);
  padding: 1em;
  padding-block-end: unset;
`;
