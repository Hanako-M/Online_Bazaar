// controllers/prod.cont.js

const product = require('../modules/product.mod.js');
const Category = require('../modules/categories.mod.js');

const searchProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
     
    const categoryDoc = await Category.findOne({ name: category }); // category = "men"
    if (categoryDoc) {
    filter.category = categoryDoc._id;}
}

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await product.countDocuments(query);

    const products = await product.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

module.exports = {
  searchProducts
};
