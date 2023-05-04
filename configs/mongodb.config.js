import { MongoClient } from 'mongodb'

async function connectToMongoDB() {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB!');
    const db = client.db("models");
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export {connectToMongoDB}