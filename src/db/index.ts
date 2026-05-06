import knex from "knex";
const config = require("../../knexfile").default;

const db = knex(config.development);

export default db;
