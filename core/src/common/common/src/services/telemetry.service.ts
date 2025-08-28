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

  async getCollection(): Promise<Collection<ITelemetry>> {
    if (!this.collection) {
      const db = this.mongoService.DB;
      const existing = await db
        .listCollections({ name: "telemetries" })
        .toArray();
      if (!existing.length) {
        await db.createCollection("telemetries");
        console.log("[MongoDB] Created collection: telemetries");
      }
      this.collection = db.collection<ITelemetry>("telemetries");
    }
    return this.collection;
  }

  async getCountsByMachine(
    machineIds?: string,
    start?: string,
    end?: string
  ): Promise<{ machineId: string; count: number }[]> {
    const match: any = {};

    if (machineIds) {
      const ids = machineIds.split(",").map(id => id.trim());
      match.machineId = { $in: ids };
    }

    if (start || end) {
      match.createdAt = {};
      if (start) match.createdAt.$gte = new Date(start);
      if (end) match.createdAt.$lte = new Date(end);
    }
    const collection = await this.getCollection();
    return (await collection
      .aggregate<{ machineId: string; count: number }>([
        { $match: match },
        {
          $group: {
            _id: "$machineId",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            machineId: "$_id",
            count: 1
          }
        }
      ])
      .toArray());
  }
}
