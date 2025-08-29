import Category from '../Models/Category.js';

const index = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json({ status: '200', categories });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

const store = async (req, res) => {
    const { name, status } = req.body;
    if (!name) {
        return res.status(400).json({
            status: 400,
            errors: { name: ['The name field is required.'] }
        });
    }

    try {
        const category = await Category.create({ name, status });
        res.json({
            status: '200',
            message: 'Category created successfully',
            category
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

const update = async (req, res) => {
    const { name, status } = req.body;
    if (!name) {
        return res.status(400).json({
            status: 400,
            errors: { name: ['The name field is required.'] }
        });
    }

    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ status: 404, message: 'Category not found' });
        }

        category.name = name;
        category.status = status;
        await category.save();

        res.json({
            status: '200',
            message: 'Category updated successfully',
            category
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

const destroy = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ status: 404, message: 'Category not found' });
        }

        await category.deleteOne();

        res.json({
            status: '200',
            message: 'Category deleted successfully',
            category
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

const show = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                status: '404',
                message: 'Category not found'
            });
        }

        res.json({ status: '200', category });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

export default {
    index,
    store,
    update,
    destroy,
    show
};
