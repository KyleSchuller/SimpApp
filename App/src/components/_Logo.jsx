import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375em;

  font-family: var(--font-custom--head), var(--font-system--base);
  font-weight: bolder;
  line-height: var(--line-height--head);
`;

function Logo() {
  return (
    <StyledLogo id='logo--head'>
      <span className='fa-layers fa-lg'>
        <FontAwesomeIcon
          icon={icon({ name: "circle-half", style: "duotone" })}
          rotation={270}
          transform='shrink-2 down-1'
          style={{
            "--fa-primary-color": "var(--body-color)",
            "--fa-secondary-color": "var(--body-contrast)",
            "--fa-secondary-opacity": "1",
          }}
        />
        <FontAwesomeIcon
          icon={icon({ name: "face-glasses", style: "duotone" })}
          style={{
            "--fa-primary-color": "var(--body-color)",
            "--fa-secondary-color": "#eab308",
            "--fa-secondary-opacity": "1",
          }}
        />
      </span>
      SimpApp
    </StyledLogo>
  );
}

export default Logo;
