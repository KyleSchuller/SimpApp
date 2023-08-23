import React from "react";
import styled from "styled-components";

import Container from "../Common/Container.jsx";
import Flexbox from "../Common/Flexbox.jsx";
import Logo from "./Logo.jsx";

const StyledHeader = styled.header`
  background-color: var(--stone-50);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  text-align: center;
  z-index: 999;
`;

function Head() {
  return (
    <StyledHeader>
      <Container $padding='1em'>
        <Flexbox $justify='space-between' $align='center'>
          <Logo />

          <button>Profile</button>
        </Flexbox>
      </Container>
    </StyledHeader>
  );
}

export default Head;
