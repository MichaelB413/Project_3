const express = require('express');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await knex('users').select('*');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

app.get('/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const accountDetails = await knex('details').where({ user_id: id });
        if (!accountDetails) {
        return res.status(404).json({ message: 'Account details not found' });
        }
        res.json(accountDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting account details', error });
    }
});

app.get('/admin', async (req, res) => {
    try {
        const allUserInfo = await knex('details').select('*');
        res.json(allUserInfo)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error fetching all account balance information', error});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
