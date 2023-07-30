const { contextBridge, ipcRenderer } = require("electron");

const api = {
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },

  off: (channel, func) => {
    ipcRenderer.removeListener(channel, func);
  },

  getPlatform: () => {
    return process.platform;
  },

  getPaths: async () => {
    const paths = await ipcRenderer.invoke("get-paths");
    return paths;
  },

  getFileData: async (filePath) => {
    const result = await ipcRenderer.invoke("get-file-data", filePath);
    return result;
  },

  directoryExists: async (directoryPath) => {
    const exists = await ipcRenderer.invoke("directory-exists", directoryPath);
    return exists;
  },
  sendDirectoryStatus: (status) => {
    ipcRenderer.send("send-directory-status", status);
  },

  fileExists: async (filePath) => {
    const exists = await ipcRenderer.invoke("file-exists", filePath);
    return exists;
  },

  onFileStatusChange: (callback) => {
    ipcRenderer.on("file-status-change", (event, status) => {
      callback(status);
    });
  },
  sendFileStatus: (status) => {
    ipcRenderer.send("file-status-change", status);
  },

  selectDirectory: async () => {
    const path = await ipcRenderer.invoke("select-directory");
    return path;
  },
};

contextBridge.exposeInMainWorld("electron", api);
