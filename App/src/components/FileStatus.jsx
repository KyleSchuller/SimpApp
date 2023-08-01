import React, { Fragment, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, light, thin, duotone, icon } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional for styling

const pulse = keyframes`
  0% {
    filter: drop-shadow(0 0 0 var(--red-50)) drop-shadow(0 0 0 var(--red-50));
  }
  100% {
    filter: drop-shadow(0 0 12px var(--red-300)) drop-shadow(0 0 4px var(--red-300));
  }
`;

const FileOutput = styled.button`
  --color: ${(props) => (props.$color ? props.$color : "currentColor")};
  --page-icon-size: 3rem;

  cursor: default;
  display: grid;
  grid-template-areas: "stack";
  place-items: center;
  padding: unset;
  outline: unset !important;

  color: var(--color);

  & .icon-stack {
    display: grid;
    grid-template-areas: "layer";
    place-items: center;

    grid-area: stack;
    pointer-events: none;

    block-size: 100%;
    inline-size: 100%;

    & > * {
      grid-area: layer;
    }

    & .page-icon {
      aspect-ratio: 0.75195312;
      block-size: unset;
      inline-size: var(--page-icon-size);
    }
    & .state-icon {
      margin-block-start: -1.25em;
    }
    & .state-text {
      margin-block-end: -1.25em;
    }
  }

  &.error {
    cursor: alias;
    border-radius: var(--corner-xs);
    animation: ${pulse} var(--transition-2xl) infinite;
    animation-direction: alternate;
    animation-timing-function: var(--out-function);
  }
`;

const FileExtension = styled.span`
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
`;
const FilePath = styled.div`
  font-family: var(--font-custom--path), var(--font-system--mono);
  font-weight: 600;
`;

function FileStatus({ file }) {
  const [fileExists, setFileExists] = useState(false);
  const [foundFilePath, setFoundFilePath] = useState("");
  const os = window.electron.getOS();
  const rootDir = window.electron.getOSRoot();
  const homeDir = window.electron.getOSPath("home");
  const documentsDir = window.electron.getOSPath("documents");

  useEffect(() => {
    let filePath = os === "win32" ? file.paths.windows[0] : file.paths.mac[0];
    filePath = filePath.replace("~", homeDir);
    filePath = filePath.replace("%USERPROFILE%\\Documents", documentsDir);
    filePath = filePath.replace("/Applications", rootDir + "Applications");
    if (!window.electron.checkFileExistence(filePath)) {
      filePath = filePath.replace(rootDir + "Applications", homeDir + "/Applications");
    }
    setFoundFilePath(filePath);
    setFileExists(window.electron.checkFileExistence(filePath));
  }, [file, os, rootDir, homeDir, documentsDir]);

  const handleOpenFileDialog = () => {
    window.electron.openFileDialog();
    window.electron.onFileDialogResponse((event, selectedFile) => {
      // Do something with the selected file
    });
  };

  // Split the file name and the extension
  const [fileName, fileExtension] = file.name.split(".");

  return (
    <Tippy
      content={
        fileExists ? (
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
        )
      }
      className={fileExists ? "custom-tippy located" : "custom-tippy missing"}>
      <FileOutput
        $color={fileExists ? "var(--green-700)" : "var(--red-700)"}
        onClick={fileExists ? void 0 : handleOpenFileDialog}
        className={fileExists ? void 0 : "error"}
        tabIndex={fileExists ? -1 : 1}
        aria-label={fileExists ? void 0 : `Browse your system for ${fileName}.${fileExtension}`}
        role={fileExists ? "presentation" : "button"}>
        <div className='icon-stack'>
          <FontAwesomeIcon className='page-icon' icon={icon({ name: "page", style: "solid" })} inverse />
          <FontAwesomeIcon className='page-icon' icon={icon({ name: "page", style: "thin" })} />
          {fileExists ? (
            <FontAwesomeIcon className='state-icon' icon={icon({ name: "check", style: "solid" })} />
          ) : (
            <FontAwesomeIcon className='state-icon' icon={icon({ name: "xmark", style: "solid" })} />
          )}
          <FileExtension className='state-text'>{fileExtension}</FileExtension>
        </div>
      </FileOutput>
    </Tippy>
  );
}

export default FileStatus;
