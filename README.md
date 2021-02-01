## electron-whiteboard-preload-demo

基于 electron 实现的白板资源预加载 demo

> 注意: 因没有需求需要进行打包 / 构建，所以本项目代码不支持打包 / 构建，目前只支持开发环境下测试

### 环境安装

```shell
cd renderer
yarn install --force --frozen-lockfile
cd ../main
yarn install --force --frozen-lockfile
```

### 开发

```shell
# 终端窗口 1(勿关闭)
cd renderer
yarn run start

# 终端创建 2(勿关闭)
cd main
yarn run start
```

### 测试流程

```
1. 启动应用，参考上面的 开发步骤
2. 点击按钮: 开始下载
3. 下载完成后，点击按钮: 测试一下
4. 如结果为 成功，说明预加载生效，并成功替换。(可以提前打开 Devtools，观看 network 的耗时情况)
```
