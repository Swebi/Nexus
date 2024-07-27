import { Router } from 'express';
import testController from './test/test.controller';

export default (): Router => {
  const app = Router();
  app.use('/test', testController());
  return app;
};
