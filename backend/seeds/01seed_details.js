const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('details').del();

  const details = Array.from({ length: 1000 }, (_, index) => ({
    user_id: index + 1,
    checking_balance: faker.finance.amount({ min: 0, max: 1000, dec: 2 }),
    savings_balance: faker.finance.amount({ min: 0, max: 1000, dec: 2 }),
    debt_balance: faker.finance.amount({ min: 0, max: 1000, dec: 2 }),
  }));

  await knex('details').insert(details);
};



