import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("todos", (table) => {
    table.timestamp("due_date", { useTz: true }).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("todos", (table) => {
    table.dropColumn("due_date");
  });
}
