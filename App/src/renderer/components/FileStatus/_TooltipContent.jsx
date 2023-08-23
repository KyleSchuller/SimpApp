import React, { Fragment } from "react";

import styled from "styled-components";

const FilePath = styled.div`
  font-family: var(--font-custom--path), var(--font-system--mono);
  font-weight: 600;
`;

function TooltipContent({ fileExists, fileName, fileExtension }) {
  return fileExists ? (
    <Fragment>
      <span>Found</span>
      <FilePath>
        {fileName}.{fileExtension}
      </FilePath>
    </Fragment>
  ) : (
    <Fragment>
      <strong>ERROR!</strong>
      <FilePath>
        {fileName}.{fileExtension}
      </FilePath>
      <small>Click to select the file</small>
    </Fragment>
  );
}

export default TooltipContent;
