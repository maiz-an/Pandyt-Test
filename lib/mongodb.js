import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let clientPromise;

// Added this file to centralize MongoDB connection logic for the todo app
// This enables connection reuse across API routes and supports the switch from in-memory todos with 'id' to MongoDB with '_id'
if (process.env.NODE_ENV === 'development') {
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  clientPromise = client.connect();
}

export default clientPromise;