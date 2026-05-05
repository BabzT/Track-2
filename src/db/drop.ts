import db from "../db";

const dropTables = async () => {
  try {
    await db.schema.dropTableIfExists("todos");
    await db.schema.dropTableIfExists("statuses");
    await db.schema.dropTableIfExists("users");

    console.log("Tables dropped successfully");
    await db.destroy();
  } catch (err) {
    console.error("Error dropping tables", err);
  }
};

dropTables();
