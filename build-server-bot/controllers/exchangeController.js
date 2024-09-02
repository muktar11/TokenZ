const { Exchange } = require('../models'); // Adjust the path according to your project structure

// Create a new Coin

// Create or Update a Coin
exports.createExchange = async (req, res) => {
     try {
        const { currencytype, value, expiry_date } = req.body;

        // Delete all existing coins
        await Exchange.destroy({ where: {} });

        // Create a new coin with the provided details
        const newExchange = await Exchange.create({
            currencytype,
            value,
            expiry_date
        });

        res.status(201).json({
            message: 'Exchange created successfully, existing rate were deleted',
            data: newExchange
        });
    } catch (error) {
        console.error('Error creating exchange:', error);
        res.status(500).json({
            message: 'Error creating exchange',
            error: error.message
        });
    }
};
// Delete a Coin by ID
exports.deleteExchange = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Exchange.destroy({
            where: {
                id
            }
        });

        if (result === 0) {
            return res.status(404).json({
                message: 'Exchange not found'
            });
        }

        res.status(200).json({
            message: 'Exchange deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting exchange:', error);
        res.status(500).json({
            message: 'Error deleting exchange',
            error: error.message
        });
    }
};


exports.getAllExchange = async (req, res) => {
    try {
        // Retrieve all users from the database
        const exchange = await Exchange.findAll({
            attributes: ['id', 'currencytype', 'value', 'expiry_date', 'timestamp'], // Specify the attributes to retrieve
        });

        // Return the list of users
        res.status(200).json(exchange);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};