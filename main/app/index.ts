import bootstrap from "./utils/BootupFlow";
import initEnv from "./bootup/init-env";
import initWindow from "./bootup/init-window";
import intIPC from "./bootup/init-ipc";
import initAppListen from "./bootup/init-app-listener";
import initPreload from "./bootup/init-preload";
import { Context } from "./types";

void bootstrap({} as Context, [initEnv, initWindow, intIPC, initAppListen, initPreload]);
