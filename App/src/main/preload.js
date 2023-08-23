const { contextBridge, ipcRenderer } = require("electron");

const api = {
  requestAllSystemInfo: () => ipcRenderer.send("request-all-system-info"),
  onAllSystemInfoResponse: (callback) => ipcRenderer.on("all-system-info", callback),

  getOS: () => ipcRenderer.sendSync("get-os"),
  getOSRoot: () => ipcRenderer.sendSync("get-os-root"),
  getOSPath: (name) => ipcRenderer.sendSync("get-os-path", name),

  checkFileExistence: (filePath) => ipcRenderer.sendSync("check-file-existence", filePath),
  openFileDialog: () => ipcRenderer.send("open-file-dialog"),
  onFileDialogResponse: (callback) => ipcRenderer.on("selected-file", callback),

  replaceValueInFile: (fields, value) => ipcRenderer.sendSync("replace-value-in-file", fields, value),

  // ...
};

contextBridge.exposeInMainWorld("electron", api);
