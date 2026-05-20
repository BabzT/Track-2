import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex("statuses")
    .insert([{ name: "pending" }, { name: "completed" }])
    .onConflict()
    .ignore();
}
