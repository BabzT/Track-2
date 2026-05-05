import "dotenv/config";
import app from "./app";
import db from "./db";

const PORT = process.env.PORT || 5000;

export const connectToDatabase = async () => {
  try {
    await db.raw("SELECT 1");
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
