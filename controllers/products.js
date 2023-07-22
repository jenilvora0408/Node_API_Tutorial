const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) queryObject.company = company;

  if (name) queryObject.name = { $regex: name, $options: "i" };

  if (featured) queryObject.featured = featured;

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.collation({ locale: "en", strength: 2 }).sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 4;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const Products = await apiData;
  res.status(200).json({ Products, nbHits: Products.length });
};

const getAllProductsTesting = async (req, res) => {
  // .sort([["price", "desc"]]) - Another approach for sorting

  // const myData = await Product.find(req.query)
  //   .collation({ locale: "en", strength: 2 })
  //   .sort("name")
  //   .exec();
  const myData = await Product.find(req.query).select("name company");

  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };
