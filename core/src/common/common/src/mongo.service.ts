import * as dotenv from "dotenv";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Db, MongoClient } from "mongodb";

dotenv.config();

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  private readonly mongoUrl =
    "mongodb+srv://muhammadawais:vkl1Phd92yEJLHOR@cluster0.0wi6ueg.mongodb.net/";
  private readonly defaultDbName = "iot-telemetry";
  private isConnected = false;

  private _mainClient: MongoClient | null = null;

  get mainClient(): MongoClient {
    if (!this._mainClient) {
      throw new Error("MongoDB client is not initialized");
    }
    return this._mainClient;
  }

  get DB(): Db {
    return this.db(this.defaultDbName);
  }

  async onModuleInit() {
    await this.connectMainCluster();
  }

  async connectMainCluster(): Promise<void> {
    if (this.isConnected) return;

    try {
      this._mainClient = new MongoClient(this.mongoUrl);
      await this._mainClient.connect();
      this.isConnected = true;
      console.log("[MongoDB] Connected to main cluster");
    } catch (error) {
      console.error("[MongoDB] Connection error:", error);
      throw new Error("Unable to connect to the main cluster");
    }
  }

  db(dbName: string): Db {
    return this.mainClient.db(dbName);
  }

  async onModuleDestroy(): Promise<void> {
    if (this._mainClient) {
      await this._mainClient.close();
      console.log("[MongoDB] Connection closed");
    }
  }
}
