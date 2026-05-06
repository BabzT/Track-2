import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("todos").del();

  const [user] = await knex("users").select("id").limit(1);
  const [pending] = await knex("statuses")
    .where({ name: "pending" })
    .select("id");
  const [completed] = await knex("statuses")
    .where({ name: "completed" })
    .select("id");

  await knex("todos").insert([
    {
      title: "Buy groceries",
      description: "Milk, eggs, bread",
      user_id: user.id,
      status_id: pending.id,
    },
    {
      title: "Walk the dog",
      description: "30 minute walk in the park",
      user_id: user.id,
      status_id: completed.id,
    },
    {
      title: "Read a book",
      description: "Finish the current chapter",
      user_id: user.id,
      status_id: pending.id,
    },
  ]);
}
