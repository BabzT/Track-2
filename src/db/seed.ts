import db from "../db";

const seedData = async () => {
  try {
    await db("todos").del();
    await db("statuses").del();
    await db("users").del();

    await db("statuses")
      .insert([{ name: "pending" }, { name: "completed" }])
      .onConflict("name")
      .ignore();

    console.log("Statuses inserted successfully");

    const [user] = await db("users")
      .insert([
        {
          name: "Akin Babz",
          email: "babatunde@gmail.com",
          password: "Babz12345.",
        },
      ])
      .returning("*");

    console.log("User inserted successfully");

    const status = await db("statuses").where({ name: "pending" }).first();

    await db("todos").insert([
      {
        title: "Finish Knex.js project",
        description: "Complete the backend for the todo app using Knex.js",
        user_id: user.id,
        status_id: status.id,
      },
      {
        title: "Write documentation",
        description: "Document the API endpoints and database schema",
        user_id: user.id,
        status_id: status.id,
      },
    ]);

    console.log("Todos inserted successfully");

    console.log("Seed data inserted successfully");
    await db.destroy();
  } catch (err) {
    console.error("Error inserting seed data", err);
  }
};

seedData();
