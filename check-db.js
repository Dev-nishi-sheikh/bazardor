
require("dotenv").config();
const { MongoClient } = require("mongodb");

async function main() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  try {
    await client.connect();
    await client.db("bazardor").command({ ping: 1 });
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  } finally {
    await client.close();
  }
}

main();

