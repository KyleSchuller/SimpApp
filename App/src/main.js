const { app, dialog, ipcMain, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

import { IS_DEV } from "./CONSTANTS";

let mainWindow; // Keep a global reference to the window object

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: IS_DEV ? 1000 : 500,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  IS_DEV && mainWindow.webContents.openDevTools();
};

app.whenReady().then(createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// Helper function to check if a file or directory exists
const existsSync = (path) => {
  try {
    fs.accessSync(path);
    return true;
  } catch {
    console.log(`Path ${path} does not exist`);
    return false;
  }
};

// Listen for an IPC request from the renderer process
ipcMain.handle("directory-exists", async (event, directoryPath) => existsSync(directoryPath));
ipcMain.handle("file-exists", async (event, filePath) => existsSync(filePath));

ipcMain.on("send-directory-status", (event, status) => {
  mainWindow.webContents.send("directory-status", status);
});

ipcMain.handle("select-directory", async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.canceled) {
    return null;
  } else {
    return result.filePaths[0];
  }
});

ipcMain.handle("get-paths", (event) => {
  return {
    home: app.getPath("home"),
    documents: app.getPath("documents"),
    // Add more paths as needed...
  };
});

ipcMain.on("get-file-data", async (event, filePath) => {
  try {
    // Read the file
    const data = fs.readFileSync(path.resolve(__dirname, filePath), "utf-8");

    // Send the file status change event
    event.reply("file-status-change", { filePath, status: "success" });

    // Return the file data
    event.reply("get-file-data-response", data);
  } catch (error) {
    // Send the file status change event
    event.reply("file-status-change", { filePath, status: "error" });

    console.error("Failed to read file:", error);
    event.reply("get-file-data-response", error);
  }
});
