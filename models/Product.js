const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: Number,
  brand: String,
  name: String,
  price: String,
  price_sign: String,
  currency: String,
  image_link: String,
  product_link: String,
  website_link: String,
  description: String,
  rating: Number,
  category: String,
  product_type: String,
  tag_list: [String],
  created_at: Date,
  updated_at: Date,
  product_api_url: String,
  api_featured_image: String,
  product_colors: [
    {
      hex_value: String,
      colour_name: String,
    },
  ],
});

module.exports = mongoose.model('Product', ProductSchema);
