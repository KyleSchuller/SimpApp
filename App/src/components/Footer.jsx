import React from "react";
import styled from "styled-components";

import Container from "./_Container.jsx";
import Flexbox from "./_Flexbox.jsx";
import Logo from "./_Logo.jsx";

const StyledFooter = styled.footer`
  background-color: #18181b;
  color: white;
  text-align: center;
`;

function Footer() {
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

export default Footer;
