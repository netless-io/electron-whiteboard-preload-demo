import { app } from "electron";
import { Context } from "../types";

export default (context: Context) => {
  const windowAllClosed = () => {
    app.on("window-all-closed", () => {
      app.exit(0);
    });
  };

  const appQuit = () => {
    app.on("quit", () => {
      app.exit(0);
    });
  };

  const mainWindowReadyToShow = () => {
    context.wins.main.once("ready-to-show", () => {
      context.wins.main.show();
    });
  };

  // Does not require sequential execution
  // Just to avoid local variables polluting Context variables
  [windowAllClosed, mainWindowReadyToShow, appQuit].forEach(f => {
    f();
  });
};
