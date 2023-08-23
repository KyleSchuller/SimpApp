import React from "react";
import styled from "styled-components";

import Container from "../Common/Container.jsx";
import Flexbox from "../Common/Flexbox.jsx";
import Logo from "./Logo.jsx";

const StyledFooter = styled.footer`
  background-color: var(--stone-950);
  color: white;
  text-align: center;
`;

function Foot() {
  return (
    <StyledFooter>
      <Container $padding='1em'>
        <Flexbox $justify='space-between' $align='center'>
          <Logo />

          <div>© 2023 SimpApp</div>
        </Flexbox>
        {/* We can add more details to the footer later */}
      </Container>
    </StyledFooter>
  );
}

export default Foot;
