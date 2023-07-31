import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Card from "./_Card.jsx";
import Container from "./_Container.jsx";

const DirectoryWrapper = styled.div`
  border-radius: var(--corner-sm);
  contain: paint;
  margin-block-end: calc(var(--corner-sm) * -1);
  margin-inline: calc(var(--corner-sm) * -1);

  & > *:last-child {
    margin-block-end: unset;
  }
`;
const Directory = styled.output`
  background-color: var(--background);
  color: white;
  display: flex;
  align-items: center;
  gap: 0.25em;
  margin-block-end: 1px;
  padding: var(--corner-sm);
`;

const FilePath = styled.div`
  direction: rtl;
  font-family: var(--font-custom--path), var(--font-system--mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Truncate = styled.span`
  direction: ltr; /* Correct the text direction */
  font-size: calc(var(--font-size) / var(--type-scale));
  letter-spacing: -0.075ch;
  unicode-bidi: bidi-override;
`;

function FileStatus({ directoryStatus }) {
  const selectDirectory = async (directory) => {
    const newPath = await window.electron.selectDirectory();
    if (newPath) {
      // Update the directory status with the new path
      setDirectoryStatus((prevStatus) => ({
        ...prevStatus,
        [directory]: { path: newPath, status: "checking" },
      }));
    }
  };

  return (
    <section>
      <Container>
        <Card>
          <h2>Directory Status</h2>
          <DirectoryWrapper>
            {Object.entries(directoryStatus).map(([directory, { path, status }]) => (
              <Directory
                key={directory}
                style={{ "--background": status === "found" ? "var(--green-600)" : "var(--red-600)" }}>
                <span className='fa-layers fa-lg' style={{ marginBlockStart: ".125em", flexShrink: 0 }}>
                  <FontAwesomeIcon icon={icon({ name: "folder", style: "solid" })} />
                  {status === "found" ? (
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

                {status !== "found" && (
                  <button onClick={() => selectDirectory(directory)} style={{ marginInlineStart: ".25em" }}>
                    Find
                    <FontAwesomeIcon icon={icon({ name: "search", style: "regular" })} size='sm' />
                  </button>
                )}
              </Directory>
            ))}
          </DirectoryWrapper>
        </Card>
      </Container>
    </section>
  );
}

export default FileStatus;
