import Size from '../Models/Size.js';

const index = async (req, res) => {
    try {
        const sizes = await Size.find().sort({ name: 1 }); // ASC order
        res.status(200).json({
            status: '200',
            sizes
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Server error'
        });
    }
};

const add = async (req, res) => {
    try {
        const size = await Size.create(req.body);
        res.status(200).json({
            status: 200,
            message: 'Size created successfully',
            size
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Server error'
        });
    }
};

export default {
    index,
    add
};
