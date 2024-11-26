const express = require('express');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5173', 
    methods: 'GET,POST,PUT,DELETE',  
    credentials: true,
}));

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

app.delete('/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await knex('details')
            .where({ user_id: id })
            .del();
        if (result === 0) {
            return res.status(404).json({ message: 'Account details were not found' });
        }
        res.json({ message: 'Account details deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting details', error });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await knex('users').where({ email }).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login', error });
    }
});

app.post('/createAccount', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await knex('users').where('email', email).first();
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already taken' });
    }

    try {
        const newUser = await knex('users').insert({ name, email, password });
        res.status(201).json({ message: 'Account created successfully', userId: newUser[0] });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.put('/details/:id', async (req, res) => {
    const { id } = req.params;
    const { checking_balance, savings_balance } = req.body;

    console.log('User ID:', id);
    console.log('Checking Balance:', checking_balance);
    console.log('Savings Balance:', savings_balance);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        if (isNaN(checking_balance) || isNaN(savings_balance)) {
            return res.status(400).json({ message: 'Invalid balance values' });
        }
        const result = await knex('details')
            .where({ user_id: id })
            .update({
                checking_balance,
                savings_balance,
            });

        if (result === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Balances updated successfully' });
    } catch (error) {
        console.error('Error updating balances:', error);
        res.status(500).json({ message: 'Error updating balances', error });
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
