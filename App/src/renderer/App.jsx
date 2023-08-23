import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

import Tippy, { useSingleton } from "@tippyjs/react";

import { filesAndDirectories } from "../shared/filesAndDirectories";

import AppWrapper from "./components/App/Wrapper.jsx";

import Card from "./components/Common/Card.jsx";
import Container from "./components/Common/Container.jsx";

import FileStatus from "./components/FileStatus.jsx";
import Options from "./components/Options/Options.jsx";

import { FilePathProvider } from "./context/FilePaths.js";

const FileStatusWrapper = styled.div`
  display: flex;
  gap: 0.5em;
`;

function App() {
  const [filePaths, setFilePaths] = useState({});
  const [source, target] = useSingleton();
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    // Request system information when the component mounts
    window.electron.requestAllSystemInfo();

    // Listen for the response from the main process
    window.electron.onAllSystemInfoResponse((event, data) => {
      setSystemInfo(data);
    });
  }, []);

  return (
    <StrictMode>
      <FilePathProvider value={{ filePaths, setFilePaths }}>
        <AppWrapper>
          <section>
            <Container>
              <Card>
                <h2>File Status</h2>
                <Tippy singleton={source} delay={[null, 128]} moveTransition='transform var(--transition-xs) var(--in-delay) var(--in-function)' className='custom-tippy' hideOnClick={false}>
                  <FileStatusWrapper>
                    {filesAndDirectories.map((file) => (
                      <FileStatus key={file.name} file={file} singleton={target} />
                    ))}
                  </FileStatusWrapper>
                </Tippy>
              </Card>
            </Container>
          </section>
          <Options systemInfo={systemInfo} />
        </AppWrapper>
      </FilePathProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
