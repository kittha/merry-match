import * as pg from "pg";
import "dotenv/config";
const { Pool } = pg.default;

let connectionPool;

try {
  connectionPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  connectionPool.connect((error) => {
    if (error) {
      console.error("Failed to connect to the database:", error);
      process.exit(-1);
    } else {
      console.log("Connected to the database successfully!");
    }
  });
} catch (error) {
  console.error("Error creating database connection pool:", error);
  process.exit(-1);
}

export default connectionPool;
