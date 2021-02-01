import { runtime } from "../utils/runtime";
import { ipcRenderer } from "electron";

const initEnv = async (): Promise<void> => {
  const runtimeKeys = Object.keys(runtime);

  const result = await ipcRenderer.invoke("mainSource", {
    actions: "get-runtime",
  });

  runtimeKeys.forEach(key => {
    // @ts-ignore
    runtime[key] = result[key];
  });
};

export default initEnv;
