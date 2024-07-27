import { Router } from 'express';
import folderController from './folder/folder.controller';
import testController from './test/test.controller';

export default (): Router => {
  const app = Router();
  app.use('/test', testController());
  app.use('/folder', folderController());
  return app;
};
