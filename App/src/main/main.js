const { app, dialog, ipcMain, BrowserWindow, session } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");
const si = require("systeminformation");

import { IS_DEV } from "../shared/CONSTANTS";

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
ipcMain.on("request-all-system-info", async (event) => {
  try {
    const cpuData = await si.cpu();
    const graphicsData = await si.graphics();
    const osData = await si.osInfo();
    const systemData = await si.system();
    // Add more information as needed

    const allSystemInfo = {
      cpuData,
      graphicsData,
      osData,
      systemData,
      // ...
    };

    event.sender.send("all-system-info", allSystemInfo);
  } catch (error) {
    console.error(error);
  }
});

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
  function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  }

  try {
    const groupedByFile = groupBy(fields, "file");
    for (let file in groupedByFile) {
      const fileFields = groupedByFile[file];
      let fileContent = await fs.promises.readFile(file, "utf-8");

      for (let i = 0; i < fileFields.length; i++) {
        const { name, replace } = fileFields[i];
        const from = new RegExp(`${name}`);
        const to = (match) => match.replace(new RegExp(replace), value);
        fileContent = fileContent.replace(from, to);
      }
      await fs.promises.writeFile(file, fileContent);
    }
    event.returnValue = true;
  } catch (error) {
    console.error("Error occurred:", error);
    event.returnValue = false;
  }
});
