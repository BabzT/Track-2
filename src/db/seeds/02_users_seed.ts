import "dotenv/config";
import type { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  const hashedPassword = await bcrypt.hash(process.env.USER_PASSWORD!, 10);

  // Inserts seed entries
  await knex("users").insert([
    {
      name: "Akin Babz",
      email: "babatunde@gmail.com",
      password: hashedPassword,
    },
  ]);
}
