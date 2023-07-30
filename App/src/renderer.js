import path from "path";

import "./App.scss";
import "./App.jsx";

import "@fontsource-variable/red-hat-display";
import "@fontsource-variable/red-hat-text";
import "@fontsource-variable/red-hat-mono";

import getDirectories from "./js/getDirectories";

async function getPaths() {
  try {
    const paths = await window.electron.getPaths();
    return paths;
  } catch (error) {
    console.error("Failed to get paths:", error);
  }
}

async function checkDirectory(directory, paths) {
  for (const directoryPath of paths) {
    const exists = await window.electron.directoryExists(directoryPath);
    if (exists) {
      console.log(`Found ${directory} at ${directoryPath}`);
      window.electron.sendDirectoryStatus({ directory, status: "found", path: directoryPath });
      return;
    }
  }

  console.log(`${directory} not found`);
  window.electron.sendDirectoryStatus({ directory, status: "not found" });
}

async function main() {
  const { home, documents } = await getPaths();

  const operatingSystem = (await window.electron.getPlatform()) === "darwin" ? "mac" : "windows";

  const DIRECTORIES = getDirectories(home, documents, operatingSystem);

  const checks = Object.entries(DIRECTORIES).map(async ([directory, paths]) => {
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

  await Promise.all(checks);
}

main();
