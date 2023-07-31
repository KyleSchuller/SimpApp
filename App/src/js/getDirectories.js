const path = require("path");

const METHOD = {
  EA: {
    windows: "C:\\Program Files\\EA Games\\",
    mac: "/Applications/The Sims 4.app/Contents/",
  },
  ORIGIN: {
    windows: "C:\\Program Files (x86)\\Origin Games\\",
    mac: "/Applications/The Sims 4.app/Contents/",
  },
  STEAM: {
    windows: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\",
    mac: "/Applications/The Sims 4.app/Contents/",
  },
  CD: {
    windows: "C:\\Program Files (x86)\\Electronic Arts\\",
    mac: "/Applications/The Sims 4.app/Contents/",
  },
};

function getDirectories(home, documents, operatingSystem) {
  return {
    Sims4: [
      path.join(home, METHOD.EA[operatingSystem]),
      path.join(home, METHOD.ORIGIN[operatingSystem]),
      path.join(home, METHOD.STEAM[operatingSystem]),
      path.join(home, METHOD.CD[operatingSystem]),
    ],
    Documents: [path.join(documents, "Electronic Arts", "The Sims 4")],
  };
}

function getFiles(home, documents, operatingSystem) {
  return {
    GraphicsRules: [
      path.join(home, METHOD.EA[operatingSystem], "Resources", "GraphicsRules.sgr"),
      path.join(home, METHOD.ORIGIN[operatingSystem], "Resources", "GraphicsRules.sgr"),
      path.join(home, METHOD.STEAM[operatingSystem], "Resources", "GraphicsRules.sgr"),
      path.join(home, METHOD.CD[operatingSystem], "Resources", "GraphicsRules.sgr"),
    ],
    Ts4CommonRules: [
      path.join(home, METHOD.EA[operatingSystem], "Resources", "Ts4CommonRules.sgr"),
      path.join(home, METHOD.ORIGIN[operatingSystem], "Resources", "Ts4CommonRules.sgr"),
      path.join(home, METHOD.STEAM[operatingSystem], "Resources", "Ts4CommonRules.sgr"),
      path.join(home, METHOD.CD[operatingSystem], "Resources", "Ts4CommonRules.sgr"),
    ],
    DefaultINI: [
      path.join(home, METHOD.EA[operatingSystem], "Resources", "Default.ini"),
      path.join(home, METHOD.ORIGIN[operatingSystem], "Resources", "Default.ini"),
      path.join(home, METHOD.STEAM[operatingSystem], "Resources", "Default.ini"),
      path.join(home, METHOD.CD[operatingSystem], "Resources", "Default.ini"),
    ],
    CameraINI: [
      path.join(home, METHOD.EA[operatingSystem], "res", "Camera.ini"),
      path.join(home, METHOD.ORIGIN[operatingSystem], "res", "Camera.ini"),
      path.join(home, METHOD.STEAM[operatingSystem], "res", "Camera.ini"),
      path.join(home, METHOD.CD[operatingSystem], "res", "Camera.ini"),
    ],
    VideoCameraINI: [
      path.join(home, METHOD.EA[operatingSystem], "res", "VideoCamera.ini"),
      path.join(home, METHOD.ORIGIN[operatingSystem], "res", "VideoCamera.ini"),
      path.join(home, METHOD.STEAM[operatingSystem], "res", "VideoCamera.ini"),
      path.join(home, METHOD.CD[operatingSystem], "res", "VideoCamera.ini"),
    ],
    OptionsINI: [path.join(documents, "Electronic Arts", "The Sims 4", "Options.ini")],
  };
}

export { getDirectories, getFiles };
