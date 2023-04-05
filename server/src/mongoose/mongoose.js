import mongoose from "mongoose";
import * as env from "dotenv";
env.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to Mongo atlas");
  } catch (error) {
    console.log("Failed to connect to Mongo atlas", error);
  }
};

export default connectDB;

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     // för att slippa alla varningstexter i konsollen:
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };
// const url = process.env.MONGO_URI;

// connectDB(url);

// export default connectDB;

///////////////////////////////////////////////////

// export function fetchCollection(name) {
//   return fetchDatabase().collection(name);
// }

// function fetchDatabase() {
//   if (db != undefined) {
//     return db;
//   }

//   const client = new MongoClient(url);

//   db = client.db(appDatabaseName);

//   return db;
// }
