const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()

  const users = Array.from({ length: 1000 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email()
  }))

  await knex('users').insert(users)}

