import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Card from "./_Card.jsx";
import Container from "./_Container.jsx";

const DirectoryWrapper = styled.div`
  border-radius: var(--corner-xs);
  contain: paint;

  & > *:last-child {
    margin-block-end: unset;
  }
`;
const Directory = styled.output`
  background-color: var(--background);
  color: white;
  display: flex;
  gap: 0.5em;
  margin-block-end: 1px;
  padding: var(--corner-sm);
`;

const FilePath = styled.div`
  width: 100%; /* Take up the rest of the flex-container */
  direction: rtl;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Truncate = styled.span`
  direction: ltr; /* Correct the text direction */
  unicode-bidi: bidi-override;
`;

function FileStatus({ directoryStatus }) {
  return (
    <section>
      <Container>
        <Card>
          <h2>Directory Status</h2>
          <DirectoryWrapper>
            {Object.entries(directoryStatus).map(([directory, { path, status }]) => (
              <Directory
                key={directory}
                style={{ "--background": status !== "found" ? "var(--green-600)" : "var(--red-600)" }}>
                <span className='fa-layers fa-fw fa-lg' style={{ marginTop: ".125em" }}>
                  <FontAwesomeIcon icon={icon({ name: "folder", style: "solid" })} />
                  {status !== "found" ? (
                    <FontAwesomeIcon
                      icon={icon({ name: "check", style: "solid" })}
                      style={{ color: "var(--background)" }}
                      transform='shrink-6 down-1'
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={icon({ name: "xmark", style: "solid" })}
                      style={{ color: "var(--background)" }}
                      transform='shrink-6 down-1'
                    />
                  )}
                </span>

                <FilePath>
                  <Truncate>{directory}</Truncate>
                </FilePath>
              </Directory>
            ))}
          </DirectoryWrapper>
        </Card>
      </Container>
    </section>
  );
}

export default FileStatus;
