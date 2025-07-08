import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || process.env.MONGO_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("✅ Connexion MongoDB Atlas réussie (native driver)");
} catch(e) {
  console.error("❌ Erreur de connexion MongoDB Atlas:", e);
}

let db = conn.db("sample_training");
export default db; 