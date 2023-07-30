import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

import Header from "./components/Header.jsx";
import FileStatus from "./components/FileStatus.jsx";
import Options from "./components/Options.jsx";
import Footer from "./components/Footer.jsx";

import getDirectories from "./js/getDirectories.js";

const StyledMain = styled.main`
  background-color: #d6d3d1;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-block: 1em;
`;

function App() {
  const [directoryStatus, setDirectoryStatus] = useState({});

  useEffect(() => {
    async function initializeDirectoryStatus() {
      const { home, documents } = await window.electron.getPaths();
      const operatingSystem = (await window.electron.getPlatform()) === "darwin" ? "mac" : "windows";
      const DIRECTORIES = getDirectories(home, documents, operatingSystem);

      const initialDirectoryStatus = {};
      for (const paths of Object.values(DIRECTORIES)) {
        for (const directoryPath of paths) {
          initialDirectoryStatus[directoryPath] = "checking";
        }
      }

      setDirectoryStatus(initialDirectoryStatus);
    }

    initializeDirectoryStatus();
  }, []);

  // Listen for directory status updates from the main process
  useEffect(() => {
    function handleDirectoryStatusChange(status) {
      console.log(`Received directory-status event for ${status.directory} with status ${status.status}`);
      setDirectoryStatus((prevStatus) => ({
        ...prevStatus,
        [status.directory]: { path: status.directoryPath, status: status.status },
      }));
    }

    window.electron.on("directory-status", handleDirectoryStatusChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.electron.off("directory-status", handleDirectoryStatusChange);
    };
  }, []);

  return (
    <StrictMode>
      <Header />
      <StyledMain>
        <FileStatus directoryStatus={directoryStatus} />
        <Options />
      </StyledMain>
      <Footer />
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
