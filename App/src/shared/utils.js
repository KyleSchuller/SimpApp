export const buildFilePath = (templatePath, homeDir, documentsDir, rootDir) => {
  let filePath = templatePath.replace("~", homeDir);
  filePath = filePath.replace("%USERPROFILE%\\Documents", documentsDir);
  filePath = filePath.replace("/Applications", rootDir + "Applications");
  return filePath;
};
