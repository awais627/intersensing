import { Injectable } from "@nestjs/common";
import { Collection, ObjectId } from "mongodb";
import { MongoService } from "../mongo.service";
import { ITelemetry } from "../../../interfaces/telemetry";

@Injectable()
export class TelemetryService {
  private collection: Collection<ITelemetry> | null = null;

  constructor(private readonly mongoService: MongoService) {}

  async create(telemetry: ITelemetry) {
    const collection = await this.getCollection();
    return await collection.insertOne(telemetry);
  }

  async findLatest(limit: number = 10): Promise<ITelemetry[]> {
    const collection = await this.getCollection();
    return await collection
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  }

  async remove(id: string) {
    const collection = await this.getCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
  }

  async findAll(): Promise<ITelemetry[]> {
    const collection = await this.getCollection();
    return await collection.find().toArray();
  }

  async query(query: Record<string, unknown>): Promise<ITelemetry[]> {
    const collection = await this.getCollection();
    return await collection.find(query).toArray();
  }

  async deleteByIds(ids: string[]) {
    const collection = await this.getCollection();
    const objectIds = ids.map((id) => new ObjectId(id));
    await collection.deleteMany({ _id: { $in: objectIds } });
  }

  async findOne(id: string): Promise<ITelemetry | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  private async getCollection(): Promise<Collection<ITelemetry>> {
    if (!this.collection) {
      const db = this.mongoService.DB;
      const existing = await db
        .listCollections({ name: "event_emitter" })
        .toArray();
      if (!existing.length) {
        await db.createCollection("event_emitter");
        console.log("[MongoDB] Created collection: event_emitter");
      }
      this.collection = db.collection<ITelemetry>("event_emitter");
    }
    return this.collection;
  }
}
