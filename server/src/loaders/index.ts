import type Express from 'express';
import express from './express';
import LoggerInstance from './logger';

export default async ({
  expressApp,
}: { expressApp: Express.Application }): Promise<void> => {
  express({ app: expressApp });
  LoggerInstance.info('✌️ Express loaded');
  LoggerInstance.info('✅ All modules loaded!');
};
