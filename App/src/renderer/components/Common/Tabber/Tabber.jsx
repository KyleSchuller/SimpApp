import React, { useState } from "react";

import Tippy from "@tippyjs/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { StyledTabberContainer, StyledTabberWrapper, StyledTabberNavi, StyledTabberNaviButton, StyledTabberDescription, StyledTabContent } from "./styles";

export function Tabber({ title, description, tooltip, children }) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <StyledTabberContainer>
      <h3 className='h5'>{title}</h3>
      <Tippy content={tooltip} className='custom-tippy'>
        <FontAwesomeIcon icon={icon({ name: "info-circle", style: "regular" })} style={{ marginBlock: "auto" }} />
      </Tippy>
      <StyledTabberDescription>{description}</StyledTabberDescription>
      <StyledTabberWrapper>
        <StyledTabberNavi role='tablist'>
          {React.Children.map(children, (child, index) => (
            <StyledTabberNaviButton role='tab' $isActive={index === selectedTabIndex} onClick={() => setSelectedTabIndex(index)} aria-controls={`tab-panel-${index}`} id={`tab-nav-${index}`} disabled={index === selectedTabIndex}>
              {child.props.title}
            </StyledTabberNaviButton>
          ))}
        </StyledTabberNavi>

        {React.Children.map(children, (child, index) => {
          if (index !== selectedTabIndex) return null;
          return React.cloneElement(child, { id: `tab-panel-${index}`, "aria-labelledby": `tab-nav-${index}` });
        })}
      </StyledTabberWrapper>
    </StyledTabberContainer>
  );
}

export function TabberContent({ id, children, "aria-labelledby": ariaLabelledBy }) {
  return (
    <StyledTabContent role='tabpanel' id={id} aria-labelledby={ariaLabelledBy}>
      {children}
    </StyledTabContent>
  );
}
