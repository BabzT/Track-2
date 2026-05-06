import "dotenv/config";
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      name: "Akin Babz",
      email: "babatunde@gmail.com",
      password: process.env.USER_PASSWORD,
    },
  ]);
}
