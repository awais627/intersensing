import * as dotenv from 'dotenv';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

dotenv.config();

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  private _mainClient: MongoClient | null = null;
  private readonly mongoUrl = process.env.MONGO_DB_URL!;
  private readonly defaultDbName = process.env.MONGO_DB_NAME!;
  private isConnected = false;

  async onModuleInit() {
    await this.connectMainCluster();
  }

  async connectMainCluster(): Promise<void> {
    if (this.isConnected) return;

    try {
      this._mainClient = new MongoClient(this.mongoUrl);
      await this._mainClient.connect();
      this.isConnected = true;
      console.log('[MongoDB] Connected to main cluster');
    } catch (error) {
      console.error('[MongoDB] Connection error:', error);
      throw new Error('Unable to connect to the main cluster');
    }
  }

  get mainClient(): MongoClient {
    if (!this._mainClient) {
      throw new Error('MongoDB client is not initialized');
    }
    return this._mainClient;
  }

  db(dbName: string): Db {
    return this.mainClient.db(dbName);
  }

  get DB(): Db {
    return this.db(this.defaultDbName);
  }

  async onModuleDestroy(): Promise<void> {
    if (this._mainClient) {
      await this._mainClient.close();
      console.log('[MongoDB] Connection closed');
    }
  }
}
