const { contextBridge, ipcRenderer } = require("electron");

const api = {
  getOS: () => ipcRenderer.sendSync("get-os"),
  getOSRoot: () => ipcRenderer.sendSync("get-os-root"),
  getOSPath: (name) => ipcRenderer.sendSync("get-os-path", name),

  checkFileExistence: (filePath) => ipcRenderer.sendSync("check-file-existence", filePath),
  openFileDialog: () => ipcRenderer.send("open-file-dialog"),
  onFileDialogResponse: (callback) => ipcRenderer.on("selected-file", callback),
  // ...
};

contextBridge.exposeInMainWorld("electron", api);
