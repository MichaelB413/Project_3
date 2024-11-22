/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('details', (table) => {
      table.integer('user_id').unsigned().notNullable().primary();
      table.decimal('checking_balance', 14, 2).defaultTo(0.0).notNullable();
      table.decimal('savings_balance', 14, 2).defaultTo(0.0).notNullable();
      table.decimal('debt_balance', 14, 2).defaultTo(0.0).notNullable();
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
  
