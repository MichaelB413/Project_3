const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

    await knex('details').del();

    const details = Array.from({ length: 1000 }, () => {
      checking_balance: faker.finance.amount({min: 0, max: 1000000, dec:2, symbol: '$'});
      savings_balance: faker.finance.amount({min: 0, max: 1000000, dec:2, symbol: '$'});
      debt_balance: faker.finance.amount({min: 0, max: 1000000, dec:2, symbol: '$'});
    })

    await knex('details').insert(details)

};



