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
    const filteredChildren = await Promise.all(
      children.map(async child => {
        const childPath = path.join(dirPath, child);
        const childStats = await stat(childPath);
        if (childStats.isDirectory()) {
          return !ignoreFolders.includes(child) ? child : null;
        }
        return !ignoreFiles.includes(child) ? child : null;
      }),
    );
    const validFiles = filteredChildren.filter(
      child => child !== null,
    ) as string[];
    info.children = await Promise.all(
      validFiles.map(child =>
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
