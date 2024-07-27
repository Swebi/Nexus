import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from 'express';
import { MESSAGES } from '../../shared/errors';
import { getDirectoryStructure } from './folder.service';

export const handleDirectoryStructure = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { directoryPath, ignoreFolders, ignoreFiles } = req.body;
  try {
    const structure = await getDirectoryStructure(
      directoryPath,
      ignoreFolders,
      ignoreFiles,
    );
    res.status(200).json({
      success: true,
      message: MESSAGES.DIRECTORY_SUCCESS,
      structure,
    });
  } catch (error) {
    next(error);
  }
};

export default (): Router => {
  const app = Router();
  app.post('/directory-structure', handleDirectoryStructure);
  return app;
};
