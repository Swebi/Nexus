import express from 'express';
import config from './config';
import Loaders from './loaders';

async function start() {
  const app = express();
  await Loaders({ expressApp: app });
  app
    .listen(config.PORT, () => {
      console.log(`
      ------------ Server listening on port: ${config.PORT}------------
    `);
    })
    .on('error', (err: Error) => {
      console.log(err);
      process.exit(1);
    });
}

start();
