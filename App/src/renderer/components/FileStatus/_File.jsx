import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";

import Tippy from "@tippyjs/react";

import FilePathContext from "../../context/filePaths.js";
import { buildFilePath } from "../../../shared/utils.js";

import IconStack from "./_IconStack.jsx";
import TooltipContent from "./_TooltipContent.jsx";

const pulse = keyframes`
  0% {
    filter: drop-shadow(0 0 0 var(--red-50)) drop-shadow(0 0 0 var(--red-50));
  }
  100% {
    filter: drop-shadow(0 0 12px var(--red-300)) drop-shadow(0 0 4px var(--red-300));
  }
`;

const FileOutput = styled.button`
  /* --color: ${(props) => (props.$color ? props.$color : "currentColor")}; */
  --color: ${(props) => (props.$fileExists ? "var(--green-700)" : "var(--red-700)")};
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

function File({ file, singleton }) {
  const [fileExists, setFileExists] = useState(false);
  const [foundFilePath, setFoundFilePath] = useState("");
  const { setFilePaths } = useContext(FilePathContext);

  const os = window.electron.getOS();
  const rootDir = window.electron.getOSRoot();
  const homeDir = window.electron.getOSPath("home");
  const documentsDir = window.electron.getOSPath("documents");

  useEffect(() => {
    const templatePath = os === "win32" ? file.paths.windows[0] : file.paths.mac[0];
    let filePath = buildFilePath(templatePath, homeDir, documentsDir, rootDir); // Use the function
    if (!window.electron.checkFileExistence(filePath)) {
      filePath = buildFilePath(templatePath.replace(rootDir + "Applications", homeDir + "/Applications"), homeDir, documentsDir, rootDir); // Use the function again if necessary
    }
    setFoundFilePath(filePath);
    setFileExists(window.electron.checkFileExistence(filePath));

    // Update the file paths in the context
    setFilePaths((prevPaths) => ({ ...prevPaths, [file.name]: filePath }));
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
    <Tippy singleton={singleton} content={<TooltipContent fileExists={fileExists} fileName={fileName} fileExtension={fileExtension} />}>
      <FileOutput $fileExists={fileExists} onClick={fileExists ? void 0 : handleOpenFileDialog} className={fileExists ? void 0 : "error"} tabIndex={fileExists ? -1 : 0} aria-label={fileExists ? `File ${fileName}.${fileExtension} found` : `File ${fileName}.${fileExtension} not found. Click to select the file`} role={fileExists ? "status" : "button"}>
        <IconStack fileExists={fileExists} fileExtension={fileExtension} />
      </FileOutput>
    </Tippy>
  );
}

export default File;
