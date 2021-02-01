import { ipcMain } from "electron";
import { Context } from "../types";
import runtime from "../utils/Runtime";

export default (_context: Context) => {
  const actionsSync = {
    "get-runtime": () => {
      return runtime;
    },
  };

  ipcMain.handle("mainSource", (_event, args: any) => {
    // @ts-ignore
    return actionsSync[args.actions](args.args);
  });
};
