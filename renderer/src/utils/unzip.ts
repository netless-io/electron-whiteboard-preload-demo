import extract from "extract-zip";

/**
 * 解压 zip 文件
 * @param {string} filePath - zip 文件绝对路径
 * @param {string} extractDir - 解压的目录，默认为和 zip 同目录下的同名文件夹，如:(test.zip -> test/)
 * @return {Promise<void>}
 */
export const extractZIP = (filePath: string, extractDir: string): Promise<void> => {
  return extract(filePath, {
    dir: extractDir,
  });
};
