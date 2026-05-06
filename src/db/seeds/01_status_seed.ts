import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("statuses").del();

  // Inserts seed entries
  await knex("statuses").insert([{ name: "pending" }, { name: "completed" }]);
}
