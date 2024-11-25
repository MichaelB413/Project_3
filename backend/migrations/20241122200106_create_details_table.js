const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('details', (table) => {
    table.integer('user_id').unsigned().notNullable().primary();
    table.decimal('checking_balance', 15, 2).notNullable();
    table.decimal('savings_balance', 15, 2).notNullable();
    table.decimal('debt_balance', 15, 2).notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');});
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('details');
};


