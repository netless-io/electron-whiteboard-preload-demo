import { app, BrowserWindow } from "electron";
import { Context } from "../types";

export default async (context: Context) => {
  await new Promise(resolve => {
    app.on("ready", resolve);
  });

  const mainWin = new BrowserWindow({
    width: 375,
    height: 668,
    center: true,
    resizable: false,
    show: false,
    webPreferences: {
      autoplayPolicy: "no-user-gesture-required",
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  mainWin.center();

  mainWin.webContents.openDevTools();

  void mainWin.loadURL("http://localhost:3000");

  context.wins.main = mainWin;
};
