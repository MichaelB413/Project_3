/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('details', (table) => {
      table.integer('user_id').unsigned().notNullable().primary();
      table.integer('checking_balance').notNullable();
      table.integer('savings_balance').notNullable();
      table.integer('debt_balance').notNullable();
      table.foreign('user_id').references('id').inTable('users') .onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('details');
  };
  
