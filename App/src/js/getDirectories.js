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
    EA_APP: [
      path.join(home, METHOD.EA[operatingSystem]),
      path.join(home, METHOD.ORIGIN[operatingSystem]),
      path.join(home, METHOD.STEAM[operatingSystem]),
      path.join(home, METHOD.CD[operatingSystem]),
    ],
    Documents: [path.join(documents, "Electronic Arts", "The Sims 4")],
  };
}

export default getDirectories;
