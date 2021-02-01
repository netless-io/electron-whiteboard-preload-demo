import { BrowserWindow } from "electron";

export interface Runtime {
  downloadsDirectory: string;
}

export interface Context {
  wins: {
    [k in "main"]: BrowserWindow;
  };
}
