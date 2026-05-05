import db from "../db";

const createTables = async () => {
  try {
    const hasUsersTable = await db.schema.hasTable("users");
    if (!hasUsersTable) {
      await db.schema.createTable("users", (table) => {
        table.uuid("id").primary().defaultTo(db.raw("gen_random_uuid()"));
        table.string("name", 255).notNullable();
        table.string("email", 255).notNullable().unique();
        table.string("password", 255).notNullable();
        table
          .timestamp("created_at", { useTz: true, precision: 6 })
          .defaultTo(db.fn.now(6));
      });

      console.log("Users table created successfully");
    } else {
      console.log("Users table already exists");
    }

    const hasStatusTable = await db.schema.hasTable("statuses");
    if (!hasStatusTable) {
      await db.schema.createTable("statuses", (table) => {
        table.uuid("id").primary().defaultTo(db.raw("gen_random_uuid()"));
        table.string("name", 255).notNullable().unique();
        table
          .timestamp("created_at", { useTz: true, precision: 6 })
          .defaultTo(db.fn.now(6));
      });

      console.log("Statuses table created successfully");
    } else {
      console.log("Statuses table already exists");
    }

    const hasTodosTable = await db.schema.hasTable("todos");
    if (!hasTodosTable) {
      await db.schema.createTable("todos", (table) => {
        table.uuid("id").primary().defaultTo(db.raw("gen_random_uuid()"));
        table.string("title", 255).notNullable().unique();
        table.text("description");
        table.uuid("user_id").references("id").inTable("users");
        table.uuid("status_id").references("id").inTable("statuses");
        table
          .timestamp("created_at", { useTz: true, precision: 6 })
          .defaultTo(db.fn.now(6));
        table
          .timestamp("updated_at", { useTz: true, precision: 6 })
          .defaultTo(db.fn.now(6));
      });

      console.log("Todos table created successfully");
    } else {
      console.log("Todos table already exist");
    }

    console.log("Migration complete");
    await db.destroy();
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

createTables();
