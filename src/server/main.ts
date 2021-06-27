/* eslint-disable no-async-promise-executor */
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as http from 'http';
import { NextApiHandler } from 'next';
import { AppModule } from './app.module';

let app: INestApplication;
let appPromise: Promise<void>;

export module Backend {
  export async function getApp() {
    if (app) {
      return app;
    }
    if (!appPromise) {
      appPromise = new Promise(async (resolve) => {
        const appInCreation = await NestFactory.create(AppModule, {
          bodyParser: false,
        });
        await appInCreation.init();
        app = appInCreation;
        resolve();
      });
    }

    await appPromise;
    return app;
  }

  export async function getListener() {
    const app = await getApp();
    const server: http.Server = app.getHttpServer();
    const [listener] = server.listeners('request') as NextApiHandler[];
    return listener;
  }
}
