import Product from '../Models/Product.js';
import Category  from '../Models/Category.js';
import Brand  from '../Models/Brand.js';

export const showProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    res.json({ status: 200, products });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const bestProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_featured: 1 }).sort({ createdAt: -1 });
    res.json({ status: 200, products });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const DiscountProducts = async (req, res) => {
  try {
    const products = await Product.find({ compare_price: { $exists: true } }).sort({ createdAt: -1 });
    res.json({ status: 200, products });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find({ status: 1 }).sort({ createdAt: 1 });
    res.json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const data = await Brand.find({ status: 1 }).sort({ createdAt: 1 });
    res.json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const query = { status: 1 };

    if (req.query.category) {
      query.category_id = { $in: req.query.category.split(',') };
    }

    if (req.query.brand) {
      query.brand_id = { $in: req.query.brand.split(',') };
    }

    const data = await Product.find(query).sort({ createdAt: -1 });

    res.json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

  // async getProductDetail(req, res) {
  export const getProductDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id)
        .populate('product_images')
        .populate({
          path: 'product_sizes',
          populate: { path: 'size_id', model: 'Size' }
        });

      if (!product) {
        return res.status(404).json({
          status: '404',
          message: 'Product not found'
        });
      }

      res.status(200).json({ status: '200', data: product });
    } catch (error) {
      res.status(500).json({ status: '500', message: 'Server Error', error });
    }
    
  };



// ✅ Get Products with Compare Price
export const getProductsWithComparePrice = async (req, res) => {
  try {
    const query = { status: 1, compare_price: { $exists: true, $ne: null } };

    if (req.query.category) {
      query.category_id = { $in: req.query.category.split(",") };
    }

    if (req.query.brand) {
      query.brand_id = { $in: req.query.brand.split(",") };
    }

    const data = await Product.find(query).sort({ createdAt: -1 });
    res.json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

// ✅ Get Featured Products
export const getFeaturedProducts = async (req, res) => {
  try {
    const query = { status: 1, is_featured: true };

    if (req.query.category) {
      query.category_id = { $in: req.query.category.split(",") };
    }

    if (req.query.brand) {
      query.brand_id = { $in: req.query.brand.split(",") };
    }

    const data = await Product.find(query).sort({ createdAt: -1 });
    res.json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

