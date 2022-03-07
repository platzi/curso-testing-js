const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  async connect() {
    if (!MongoLib.connection) {
      await this.client.connect();
      MongoLib.connection = this.client.db(this.dbName);
      return MongoLib.connection;
    }
    return MongoLib.connection;
  }

  async getAll(collection, query) {
    const db = await this.connect();
    return db.collection(collection).find(query).toArray();
  }

  async get(collection, id) {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();
    const rta = await db.collection(collection).insertOne(data);
    return this.get(collection, rta.insertedId);
  }

  async update(collection, id, data) {
    const db = await this.connect();
    await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return this.get(collection, id);
  }

  async delete(collection, id) {
    const db = await this.connect();
    return db.collection(collection).deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = MongoLib;
