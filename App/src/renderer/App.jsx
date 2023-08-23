import React, { useState, useEffect } from "react";

import Head from "./components/App/Head.jsx";
import Main from "./components/App/Main.jsx";
import Foot from "./components/App/Foot.jsx";

import FileStatus from "./components/FileStatus/Files.jsx";
import Options from "./components/Options/Options.jsx";

import { FilePathProvider } from "./context/filePaths.js";

function App() {
  const [filePaths, setFilePaths] = useState({});
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
    <FilePathProvider value={{ filePaths, setFilePaths }}>
      <Head />
      <Main>
        <FileStatus />
        <Options systemInfo={systemInfo} />
      </Main>
      <Foot />
    </FilePathProvider>
  );
}

export default App;
