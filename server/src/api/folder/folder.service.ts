import * as fs from 'node:fs';
import * as path from 'node:path';
import { ERRORS } from '../../shared/errors';
import type { DirectoryInfo } from './folder.schema';

const readdir = fs.promises.readdir;
const stat = fs.promises.stat;

export async function getDirectoryStructure(
  dirPath: string,
  ignoreFolders: string[] = [],
  ignoreFiles: string[] = [],
): Promise<DirectoryInfo> {
  if (!fs.existsSync(dirPath)) {
    throw {
      statusCode: ERRORS.DIRECTORY_NOT_FOUND.statusCode,
      message: ERRORS.DIRECTORY_NOT_FOUND.message.error,
    };
  }
  const stats = await stat(dirPath);
  const info: DirectoryInfo = {
    path: dirPath,
    name: path.basename(dirPath),
    size: stats.size,
    type: stats.isDirectory() ? 'directory' : 'file',
  };

  if (info.type === 'directory') {
    const children = await readdir(dirPath);
    info.children = await Promise.all(
      children
        .filter(async child => {
          const childPath = path.join(dirPath, child);
          const childStats = await stat(childPath);
          if (childStats.isDirectory()) {
            return !ignoreFolders.includes(child);
          }
          return !ignoreFiles.includes(child);
        })
        .map(async child =>
          getDirectoryStructure(
            path.join(dirPath, child),
            ignoreFolders,
            ignoreFiles,
          ),
        ),
    );
    info.size = info.children.reduce((total, child) => total + child.size, 0);
  } else {
    info.extension = path.extname(dirPath);
  }
  return info;
}
