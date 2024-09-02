const { User } = require('../models'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JWT for token generation
// Function to create a new user (registration)

const createUser = async (req, res) => {
    const { phone, password, ...otherDetails } = req.body;
    try {
        zz// Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user with hashed password
        const user = await User.create({
            phone,
            password: hashedPassword, // Store hashed password
            ...otherDetails
        });

        // Generate a JWT token for the new user
        const token = jwt.sign(
            { userId: user.id, phone: user.phone },  // Payload with user ID and phone
            process.env.JWT_SECRET, // Ensure JWT_SECRET is used
            { expiresIn: '1h' } // Token expiry time
        ); 
        // Return the token and user information
        res.status(201).json({ token, user: { phone: user.phone, username: user.username, id: user.id, coins: user.coins } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const getUsers = async (req, res) => {
    const { phone, password } = req.body;

    try {
        // Find the user by phone
        const user = await User.findOne({ where: { phone } });

        // If user not found, return error
        if (!user) {
            return res.status(401).json({ error: 'Invalid phone number or password.' });
        }

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // If password is invalid, return error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid phone number or password.' });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            { userId: user.id, phone: user.phone },  // Correctly reference the user object here
            process.env.JWT_SECRET, // Ensure JWT_SECRET is used
            { expiresIn: '1h' } // Token expiry time
        );

        // Return the token and user information
        res.status(200).json({ token, user: { phone: user.phone, username: user.username, id: user.id, coins: user.coins } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllUser = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.findAll({
            attributes: ['id', 'username', 'phone', 'coins', 'role'], // Specify the attributes to retrieve
        });

        // Return the list of users
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports = {
    getUsers,
    createUser,
    getAllUser,
};