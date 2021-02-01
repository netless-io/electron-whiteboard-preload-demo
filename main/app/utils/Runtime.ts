import path from "path";
import { app } from "electron";
import { Runtime } from "../types";

const downloadsDirectory = path.join(app.getPath("userData"), "downloads");

const runtime: Runtime = {
  downloadsDirectory,
};

export default runtime;
