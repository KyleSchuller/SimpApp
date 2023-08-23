import React, { Fragment } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const FileExtension = styled.span`
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
`;

function FileIcon() {
  return (
    <Fragment>
      <FontAwesomeIcon className='page-icon' icon={icon({ name: "page", style: "solid" })} inverse aria-hidden='true' />
      <FontAwesomeIcon className='page-icon' icon={icon({ name: "page", style: "thin" })} aria-hidden='true' />
    </Fragment>
  );
}

function StatusIcon({ fileExists }) {
  if (fileExists) {
    return <FontAwesomeIcon className='state-icon' icon={icon({ name: "check", style: "solid" })} aria-label='File found' />;
  } else {
    return <FontAwesomeIcon className='state-icon' icon={icon({ name: "xmark", style: "solid" })} aria-label='File not found' />;
  }
}

function IconStack({ fileExists, fileExtension }) {
  return (
    <div className='icon-stack'>
      <FileIcon />
      <StatusIcon fileExists={fileExists} />
      <FileExtension className='state-text'>{fileExtension}</FileExtension>
    </div>
  );
}

export default IconStack;
