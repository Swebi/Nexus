import type Express from 'express';
import database from './database';
import express from './express';
import LoggerInstance from './logger';

export default async ({
  expressApp,
}: { expressApp: Express.Application }): Promise<void> => {
  await database();
  LoggerInstance.info('✌️ Connection to database successful');
  express({ app: expressApp });
  LoggerInstance.info('✌️ Express loaded');
  LoggerInstance.info('✅ All modules loaded!');
};
