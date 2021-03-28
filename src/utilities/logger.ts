export type Logger = (...params: any[]) => void;
export const loggerWith = (debugMode: boolean) => (...params: any[]) => {
  debugMode && console.log(...params);
};
