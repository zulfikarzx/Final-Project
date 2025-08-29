import Brand from '../Models/Brand.js';
// import Category from '../models/Category.js';

async function index(req, res) {
    try {
        const brands = await Brand.find().sort({ createdAt: -1 });
        res.json({ status: '200', brands });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
}

const store = async (req, res) => {
    const { name, status } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 400,
            errors: { name: ['The name field is required.'] }
        });
    }

    try {
        const brand = await Brand.create({ name, status });
        res.json({
            status: '200',
            message: 'brands created successfully',
            brands: brand
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
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        brand.name = name;
        brand.status = status;
        await brand.save();

        res.json({
            status: '200',
            message: 'brands updated successfully',
            brands: brand
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

const destroy = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ status: '404', message: 'Brand not found' });
        }

        await brand.deleteOne();

        res.json({
            status: '200',
            message: 'brands deleted successfully',
            brands: brand
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};

const show = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({
                status: '404',
                message: 'brands not found'
            });
        }

        res.json({ status: '200', brands: brand });
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
