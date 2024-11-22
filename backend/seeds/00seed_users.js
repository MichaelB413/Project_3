/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {name: 'alex', email: 'alex@alex.com'},
    {name: 'cheif keef', email: 'keef@alex.com'},
    {name: 'gambler', email: 'gambler@alex.com'}
  ]);
};
