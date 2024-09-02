const { Youtubevideo } = require('../models'); // Adjust the path according to your project structure


// Create a new YouTube video and delete all existing videos
exports.createYoutubevideo = async (req, res) => {
    try {
        const { url } = req.body;

        // Delete all existing YouTube videos
        await Youtubevideo.destroy({ where: {} });

        // Create a new YouTube video with the provided URL
        const newYoutubevideo = await Youtubevideo.create({
            url,
        });

        res.status(201).json({
            message: 'YouTube video created successfully, existing videos were deleted',
            data: newYoutubevideo
        });
    } catch (error) {
        console.error('Error creating YouTube video:', error);
        res.status(500).json({
            message: 'Error creating YouTube video',
            error: error.message
        });
    }
};


// Delete a YouTube video by ID
exports.deleteYoutubevideo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Youtubevideo.destroy({
            where: {
                id
            }
        });

        if (result === 0) {
            return res.status(404).json({
                message: 'YouTube video not found'
            });
        }

        res.status(200).json({
            message: 'YouTube video deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting YouTube video:', error);
        res.status(500).json({
            message: 'Error deleting YouTube video',
            error: error.message
        });
    }
};


exports.getAllUrl = async (req, res) => {
    try {
        // Retrieve all users from the database
        const urls = await Youtubevideo.findAll({
            attributes: ['id', 'url', ], // Specify the attributes to retrieve
        });
        // Return the list of users
        res.status(200).json(urls);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

