import React from "react";
import styled from "styled-components";

import Container from "./_Container.jsx";
import Flexbox from "./_Flexbox.jsx";

const StyledHeader = styled.header`
  background-color: #f5f5f5;
  text-align: center;
`;

function Header() {
  return (
    <StyledHeader>
      <Container $padding='1em'>
        <Flexbox $justify='space-between' $align='center'>
          <div id='logo--head' className='_flush'>
            <h1 className='h6'>💎 SimpApp</h1>
          </div>

          <button>Profile</button>
        </Flexbox>
      </Container>
    </StyledHeader>
  );
}

export default Header;
