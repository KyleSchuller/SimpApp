const { app, dialog, ipcMain, BrowserWindow } = require("electron");
const fs = require("fs");
const os = require("os");
const path = require("path");

const replaceInFile = require("replace-in-file");

import { IS_DEV } from "./CONSTANTS";

let mainWindow;

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

app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());

app.on("activate", () => BrowserWindow.getAllWindows().length === 0 && createMainWindow());

// Listen for an IPC request from the renderer process
ipcMain.on("get-os", (event) => {
  event.returnValue = process.platform;
});
ipcMain.on("get-os-root", (event) => {
  event.returnValue = path.parse(app.getAppPath()).root;
});

ipcMain.on("get-os-path", (event, name) => {
  event.returnValue = app.getPath(name);
});

ipcMain.on("check-file-existence", (event, filePath) => {
  event.returnValue = fs.existsSync(filePath);
});

ipcMain.on("open-file-dialog", (event) => {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
    })
    .then((result) => {
      if (!result.canceled) {
        event.sender.send("selected-file", result.filePaths[0]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("replace-value-in-file", async (event, fields, value) => {
  try {
    for (let i = 0; i < fields.length; i++) {
      const { name, replace, file, isRegex } = fields[i];
      let from;
      if (isRegex) {
        from = new RegExp(`${name}`);
      } else {
        from = new RegExp(`(${name})(\\d+)`, "m");
      }

      const to = (match) => match.replace(new RegExp(replace), value);

      const option = {
        files: file,
        from,
        to,
      };

      const result = await replaceInFile(option);
      console.log("Replacement result:", result);
    }
    event.returnValue = true;
  } catch (error) {
    console.error("Error occurred:", error);
    event.returnValue = false;
  }
});
