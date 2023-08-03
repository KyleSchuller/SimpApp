import React from "react";

const FilePathContext = React.createContext();

export const FilePathProvider = FilePathContext.Provider;
export const FilePathConsumer = FilePathContext.Consumer;

export default FilePathContext;
