const { Coin } = require('../models'); // Adjust the path according to your project structure

// Create a new Coin

// Create or Update a Coin
exports.createCoin = async (req, res) => {
     try {
        const { code, value, expiry_date } = req.body;

        // Delete all existing coins
        await Coin.destroy({ where: {} });

        // Create a new coin with the provided details
        const newCoin = await Coin.create({
            code,
            value,
            expiry_date
        });

        res.status(201).json({
            message: 'Coin created successfully, existing coins were deleted',
            data: newCoin
        });
    } catch (error) {
        console.error('Error creating coin:', error);
        res.status(500).json({
            message: 'Error creating coin',
            error: error.message
        });
    }
};
// Delete a Coin by ID
exports.deleteCoin = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Coin.destroy({
            where: {
                id
            }
        });

        if (result === 0) {
            return res.status(404).json({
                message: 'Coin not found'
            });
        }

        res.status(200).json({
            message: 'Coin deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting coin:', error);
        res.status(500).json({
            message: 'Error deleting coin',
            error: error.message
        });
    }
};


exports.getAllCoin = async (req, res) => {
    try {
        // Retrieve all users from the database
        const coins = await Coin.findAll({
            attributes: ['id', 'code', 'value', 'expiry_date', 'timestamp'], // Specify the attributes to retrieve
        });

        // Return the list of users
        res.status(200).json(coins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

