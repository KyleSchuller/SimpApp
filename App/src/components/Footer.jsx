import React from "react";
import styled from "styled-components";

import Container from "./_Container.jsx";

const StyledFooter = styled.footer`
  background-color: #f5f5f5;
  text-align: center;
`;

function Footer() {
  return (
    <StyledFooter>
      <Container $padding='1em'>
        <div>© 2023 SimpApp</div>
        {/* We can add more details to the footer later */}
      </Container>
    </StyledFooter>
  );
}

export default Footer;
