// Define common paths
const EA_PATH_WINDOWS = "C:\\Program Files\\EA Games\\";
const ORIGIN_PATH_WINDOWS = "C:\\Program Files (x86)\\Origin Games\\";
const STEAM_PATH_WINDOWS = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\";
const CD_PATH_WINDOWS = "C:\\Program Files (x86)\\Electronic Arts\\";

const MAC_PATH = "/Applications/The Sims 4.app/Contents/";

const RESOURCES_PATH = "Resources";
const RES_PATH = "res";

// Define common files
const GRAPHICS_RULES = "GraphicsRules.sgr";
const TS4_COMMON_RULES = "Ts4CommonRules.sgr";
const DEFAULT_INI = "Default.ini";
const CAMERA_INI = "Camera.ini";
const VIDEO_CAMERA_INI = "VideoCamera.ini";
const OPTIONS_INI = "Options.ini";

const generatePaths = (fileName, resPath = RESOURCES_PATH) => ({
  windows: [`${EA_PATH_WINDOWS}${resPath}\\${fileName}`, `${ORIGIN_PATH_WINDOWS}${resPath}\\${fileName}`, `${STEAM_PATH_WINDOWS}${resPath}\\${fileName}`, `${CD_PATH_WINDOWS}${resPath}\\${fileName}`],
  mac: [`${MAC_PATH}${resPath}/${fileName}`],
});

export const filesAndDirectories = [
  {
    name: GRAPHICS_RULES,
    paths: generatePaths(GRAPHICS_RULES),
  },
  {
    name: TS4_COMMON_RULES,
    paths: generatePaths(TS4_COMMON_RULES),
  },
  {
    name: DEFAULT_INI,
    paths: generatePaths(DEFAULT_INI),
  },
  {
    name: CAMERA_INI,
    paths: generatePaths(CAMERA_INI, RES_PATH),
  },
  {
    name: VIDEO_CAMERA_INI,
    paths: generatePaths(VIDEO_CAMERA_INI, RES_PATH),
  },
  {
    name: OPTIONS_INI,
    paths: {
      windows: [`%USERPROFILE%\\Documents\\Electronic Arts\\The Sims 4\\${OPTIONS_INI}`],
      mac: [`~/Documents/Electronic Arts/The Sims 4/${OPTIONS_INI}`],
    },
  },
];
