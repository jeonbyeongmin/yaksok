import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongoose: any;
}

// This is the cached database connection
let cached = global.mongoose;

// If no cached connection, create a new connection
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function getMongoose() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  return cached.promise;
}

async function dbConnect() {
  try {
    cached.conn = await getMongoose();
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
