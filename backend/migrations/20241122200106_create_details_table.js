/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('details', (table) => {
        table.integer('user_id').unsigned().notNullable();
        table.decimal('checking_balance', 14, 2).defaultTo(0.0);
        table.decimal('savings_balance', 14, 2).defaultTo(0.0);
        table.decimal('debt_balance', 14, 2).defaultTo(0.0);
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('details');
};
