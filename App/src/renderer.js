import path from "path";

import "./App.scss";
import "./App.jsx";

import "@fontsource-variable/red-hat-display";
import "@fontsource-variable/lexend"; // Supports weights 100-900
import "@fontsource-variable/red-hat-mono";
import "@fontsource-variable/fira-code"; // Supports weights 300-700

import { getDirectories, getFiles } from "./js/getDirectories.js";

async function getPaths() {
  try {
    const paths = await window.electron.getPaths();
    return paths;
  } catch (error) {
    console.error("Failed to get paths:", error);
  }
}

async function main() {
  const { home, documents } = await getPaths();

  const operatingSystem = (await window.electron.getPlatform()) === "darwin" ? "mac" : "windows";

  const DIRECTORIES = getDirectories(home, documents, operatingSystem);
  const FILES = getFiles(home, documents, operatingSystem);

  const directoryChecks = Object.entries(DIRECTORIES).map(async ([directory, paths]) => {
    console.log(`Checking ${directory}...`);
    for (const directoryPath of paths) {
      const exists = await window.electron.directoryExists(directoryPath);
      if (exists) {
        console.log(`Found ${directory} at ${directoryPath}`);
        window.electron.sendDirectoryStatus({ directory: directoryPath, status: "found" });
      } else {
        console.log(`${directory} not found at ${directoryPath}`);
        window.electron.sendDirectoryStatus({ directory: directoryPath, status: "not found" });
      }
    }
  });

  const fileChecks = Object.entries(FILES).map(async ([file, paths]) => {
    console.log(`Checking ${file}...`);
    for (const filePath of paths) {
      const exists = await window.electron.fileExists(filePath);
      if (exists) {
        console.log(`Found ${file} at ${filePath}`);
        window.electron.sendFileStatus({ file: filePath, status: "found" });
      } else {
        console.log(`${file} not found at ${filePath}`);
        window.electron.sendFileStatus({ file: filePath, status: "not found" });
      }
    }
  });

  await Promise.all([...directoryChecks, ...fileChecks]);
}

main();
