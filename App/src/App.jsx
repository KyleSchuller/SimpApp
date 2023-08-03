import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

import { filesAndDirectories } from "./js/filesAndDirectories";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Card from "./components/_Card.jsx";
import Container from "./components/_Container.jsx";

import FileStatus from "./components/FileStatus.jsx";
import Options from "./components/Options.jsx";

import { FilePathProvider } from "./context/FilePaths.js";

const StyledMain = styled.main`
  background-color: #d6d3d1;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-block: 1em;
`;
const FileStatusWrapper = styled.div`
  display: flex;
  gap: 0.5em;
`;

function App() {
  const [filePaths, setFilePaths] = useState({});

  return (
    <StrictMode>
      <FilePathProvider value={{ filePaths, setFilePaths }}>
        <Header />
        <StyledMain>
          <section>
            <Container>
              <Card>
                <h2>File Status</h2>
                <FileStatusWrapper>
                  {filesAndDirectories.map((file) => (
                    <FileStatus key={file.name} file={file} />
                  ))}
                </FileStatusWrapper>
              </Card>
            </Container>
          </section>
          <Options />
        </StyledMain>
        <Footer />
      </FilePathProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
