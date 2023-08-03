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

export const filesAndDirectories = [
  {
    name: GRAPHICS_RULES,
    paths: {
      windows: [
        `${EA_PATH_WINDOWS}${RESOURCES_PATH}\\${GRAPHICS_RULES}`,
        `${ORIGIN_PATH_WINDOWS}${RESOURCES_PATH}\\${GRAPHICS_RULES}`,
        `${STEAM_PATH_WINDOWS}${RESOURCES_PATH}\\${GRAPHICS_RULES}`,
        `${CD_PATH_WINDOWS}${RESOURCES_PATH}\\${GRAPHICS_RULES}`,
      ],
      mac: [`${MAC_PATH}${RESOURCES_PATH}/${GRAPHICS_RULES}`],
    },
  },
  {
    name: TS4_COMMON_RULES,
    paths: {
      windows: [
        `${EA_PATH_WINDOWS}${RESOURCES_PATH}\\${TS4_COMMON_RULES}`,
        `${ORIGIN_PATH_WINDOWS}${RESOURCES_PATH}\\${TS4_COMMON_RULES}`,
        `${STEAM_PATH_WINDOWS}${RESOURCES_PATH}\\${TS4_COMMON_RULES}`,
        `${CD_PATH_WINDOWS}${RESOURCES_PATH}\\${TS4_COMMON_RULES}`,
      ],
      mac: [`${MAC_PATH}${RESOURCES_PATH}/${TS4_COMMON_RULES}`],
    },
  },
  {
    name: DEFAULT_INI,
    paths: {
      windows: [
        `${EA_PATH_WINDOWS}${RESOURCES_PATH}\\${DEFAULT_INI}`,
        `${ORIGIN_PATH_WINDOWS}${RESOURCES_PATH}\\${DEFAULT_INI}`,
        `${STEAM_PATH_WINDOWS}${RESOURCES_PATH}\\${DEFAULT_INI}`,
        `${CD_PATH_WINDOWS}${RESOURCES_PATH}\\${DEFAULT_INI}`,
      ],
      mac: [`${MAC_PATH}${RESOURCES_PATH}/${DEFAULT_INI}`],
    },
  },
  {
    name: CAMERA_INI,
    paths: {
      windows: [
        `${EA_PATH_WINDOWS}${RES_PATH}\\${CAMERA_INI}`,
        `${ORIGIN_PATH_WINDOWS}${RES_PATH}\\${CAMERA_INI}`,
        `${STEAM_PATH_WINDOWS}${RES_PATH}\\${CAMERA_INI}`,
        `${CD_PATH_WINDOWS}${RES_PATH}\\${CAMERA_INI}`,
      ],
      mac: [`${MAC_PATH}${RES_PATH}/${CAMERA_INI}`],
    },
  },
  {
    name: VIDEO_CAMERA_INI,
    paths: {
      windows: [
        `${EA_PATH_WINDOWS}${RES_PATH}\\${VIDEO_CAMERA_INI}`,
        `${ORIGIN_PATH_WINDOWS}${RES_PATH}\\${VIDEO_CAMERA_INI}`,
        `${STEAM_PATH_WINDOWS}${RES_PATH}\\${VIDEO_CAMERA_INI}`,
        `${CD_PATH_WINDOWS}${RES_PATH}\\${VIDEO_CAMERA_INI}`,
      ],
      mac: [`${MAC_PATH}${RES_PATH}/${VIDEO_CAMERA_INI}`],
    },
  },
  {
    name: OPTIONS_INI,
    paths: {
      windows: [`%USERPROFILE%\\Documents\\Electronic Arts\\The Sims 4\\${OPTIONS_INI}`],
      mac: [`~/Documents/Electronic Arts/The Sims 4/${OPTIONS_INI}`],
    },
  },
];
