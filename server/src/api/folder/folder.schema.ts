export interface DirectoryInfo {
  path: string;
  name: string;
  size: number;
  type: 'directory' | 'file';
  extension?: string;
  children?: DirectoryInfo[];
}
