import { IS_DEV } from "./CONSTANTS";

const { app, BrowserWindow } = require("electron");

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: IS_DEV ? 1000 : 500,
    height: 600,
    webPreferences: {
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
