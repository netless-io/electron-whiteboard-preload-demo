import { protocol, session } from "electron";
import path from "path";
import fs from "fs-extra";
import { Context } from "../types";
import runtime from "../utils/Runtime";

export default (_context: Context) => {
  // electron 9 版本之后，下面的代码必须加上，否则因为 electron 无法处理 file 协议而导致 预加载失效
  // 详情可见: https://github.com/electron/electron/issues/23757
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = decodeURI(request.url.replace("file:///", ""));
    callback(pathname);
  });

  const filter = {
    urls: [
      "https://convertcdn.netless.link/dynamicConvert/*",
      "https://convertcdn.netless.link/staticConvert/*",
    ],
  };

  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    const pathname = new URL(details.url).pathname;
    const localPath = path.join(runtime.downloadsDirectory, pathname);

    if (fs.existsSync(localPath)) {
      callback({
        redirectURL: `file://${localPath}`,
      });
    } else {
      callback({});
    }
  });
};
