import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({ name, price, image });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error al agregar producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const update = req.body;
    if (req.file) update.image = req.file.filename;

    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar producto" });
  }
};
