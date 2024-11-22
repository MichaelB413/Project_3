exports.seed = async function (knex) {
  try {
    await knex('details').del();
    await knex('details').insert([
      { user_id: 1, checking_balance: 100.22, savings_balance: 21.21, debt_balance: 17.38 },
      { user_id: 2, checking_balance: 1000000.22, savings_balance: 21.21, debt_balance: 17.38 },
      { user_id: 3, checking_balance: 1.22, savings_balance: 21000.21, debt_balance: 1700000.38 },
    ]);
  } catch (error) {
    console.error('Error seeding details table:', error);
  }
};

