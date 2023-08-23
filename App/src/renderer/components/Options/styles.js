import styled from "styled-components";

export const FormGroup = styled.div`
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
