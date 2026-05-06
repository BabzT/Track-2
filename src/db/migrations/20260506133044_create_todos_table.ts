import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("todos", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("title", 255).notNullable().unique();
    table.text("description");
    table.uuid("user_id").references("id").inTable("users");
    table.uuid("status_id").references("id").inTable("statuses");
    table
      .timestamp("created_at", { useTz: true, precision: 6 })
      .defaultTo(knex.fn.now(6));
    table
      .timestamp("updated_at", { useTz: true, precision: 6 })
      .defaultTo(knex.fn.now(6));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("todos");
}
