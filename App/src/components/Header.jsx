import React from "react";
import styled from "styled-components";

import Container from "./_Container.jsx";
import Flexbox from "./_Flexbox.jsx";
import Logo from "./_Logo.jsx";

const StyledHeader = styled.header`
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  text-align: center;
  z-index: 999;
`;

function Header() {
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

export default Header;
