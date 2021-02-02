import React, { useState } from "react";
import "./App.css";
import path from "path";
import { DownloadFile } from "./utils/downloadFile";
import { extractZIP } from "./utils/unzip";
import { runtime } from "./utils/runtime";
import { copySync, removeSync } from "fs-extra";
import { pptTypeMap } from "./utils/pptTypeMap";

enum StatusText {
  Idle,
  DownloadRunning,
  Stop,
  DownloadFailed,
  UnzipRunning,
  UnzipFailed,
}

enum TestResultText {
  Idle,
  Success,
  Failed,
  RequestFailed,
}

// 动态PPT资源
const pptInfo = {
  uuid: "6a212c90fa5311ea8b9c074232aaccd4",
  type: pptTypeMap("dynamic"),
};

// 静态PPT 资源
// const pptInfo = {
//   uuid: "b31e27d0650211ebb87bfb941610b9b9",
//   type: pptTypeMap("static"),
// };

// 只需要知道 资源PPT 的 uuid、类型，即可实现预加载功能
// 资源PPT 的 uuid、类型，可以通过 发起文档转换请求获取
// 相关文档可见: https://developer.netless.link/server-zh/home/server-conversion#h-201-created
// 注意: 如果是静态资源PPT，则在发起文档转换请求时，pack 必须为 true，否则因为没有生成 zip 文件，从而导致 预加载失败
const url = `https://convertcdn.netless.link/${pptInfo.type}/${pptInfo.uuid}.zip`;

function App() {
  const [status, setStatus] = useState(StatusText.Idle);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [testResult, setTestResult] = useState(TestResultText.Idle);

  const downloadDir = path.join(runtime.downloadsDirectory, pptInfo.type, pptInfo.uuid);

  const download = () => {
    setStatus(StatusText.DownloadRunning);

    const download = new DownloadFile(url);

    download.onProgress(progressObj => {
      const progress = Math.round(progressObj.progress);
      setDownloadProgress(progress);
    });

    download.onError(e => {
      setStatus(StatusText.DownloadFailed);
      console.log(e);
    });

    download.onEnd(d => {
      setStatus(StatusText.UnzipRunning);

      // 解压下载的文件
      extractZIP(d.filePath, downloadDir)
        .then(() => {
          // 删除原始的 zip 文件
          removeSync(d.filePath);

          // 把 解压后的文件 复制到 下载目录里
          copySync(
            path.join(runtime.downloadsDirectory, pptInfo.type, pptInfo.uuid, pptInfo.uuid),
            downloadDir
          );

          // 删除解压后的文件
          removeSync(
            path.join(runtime.downloadsDirectory, pptInfo.type, pptInfo.uuid, pptInfo.uuid)
          );

          setStatus(StatusText.Stop);
        })
        .catch(e => {
          setStatus(StatusText.UnzipFailed);
          console.error(e);
        });
    });

    download.start();
  };

  const downloadText = () => {
    switch (status) {
      case StatusText.Idle: {
        return <span>等待下载</span>;
      }
      case StatusText.DownloadRunning: {
        return <span>下载进度: {downloadProgress} %</span>;
      }
      case StatusText.UnzipRunning: {
        return <span>正在解压</span>;
      }
      case StatusText.Stop: {
        return <span>完成</span>;
      }
      case StatusText.DownloadFailed: {
        return <span>下载失败</span>;
      }
      case StatusText.UnzipFailed: {
        return <span>解压失败</span>;
      }
    }
  };

  const testText = () => {
    switch (testResult) {
      case TestResultText.Idle: {
        return "未开始";
      }
      case TestResultText.Success: {
        return "成功";
      }
      case TestResultText.Failed: {
        return "失败";
      }
      case TestResultText.RequestFailed: {
        return "请求失败";
      }
    }
  };

  const testPreload = () => {
    fetch(
      // 动态PPT 文件大小: 13M
      "https://convertcdn.netless.link/dynamicConvert/6a212c90fa5311ea8b9c074232aaccd4/resources/ppt/media/media1.mp4"
      // 静态PPT 文件大小 2.8M
      // "https://convertcdn.netless.link/staticConvert/b31e27d0650211ebb87bfb941610b9b9/3.png"
    )
      .then(data => {
        // 如果请求的协议为 file，说明预加载成功
        if (data.url.startsWith("file://")) {
          setTestResult(TestResultText.Success);
        } else {
          setTestResult(TestResultText.Failed);
        }
      })
      .catch(e => {
        setTestResult(TestResultText.RequestFailed);
        console.error(e);
      });
  };

  return (
    <div className="App">
      <span
        style={{
          wordBreak: "break-all",
        }}
      >
        下载目录: {downloadDir}
      </span>
      <br />
      <br />
      <span>英语测试.ppt</span>
      <button onClick={download}>开始下载</button>
      <br />
      <br />
      {downloadText()}
      <br />
      <br />
      <button onClick={testPreload}>测试一下</button>
      <br />
      <span>测试结果: {testText()}</span>
    </div>
  );
}

export default App;
