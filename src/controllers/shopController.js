const Products = require("../models/ProductModel");
const Student = require("../models/studentModel");
const ProductCode = require("../models/ProductCodeModel");


const buyProduct = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    let product = await Products.findById(id);
    let student = await Student.findById(userId);

    if (!product || !product.quantity) {
      return res
        .status(404)
        .json({ message: "Product not found or out of stock" });
    }

    if (product.price > student.coinBalance) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    product.quantity -= 1;
    student.coinBalance -= product.price;

    await Products.findByIdAndUpdate(id, { quantity: product.quantity });
    await Student.findByIdAndUpdate(userId, { coinBalance: student.coinBalance });

    res.status(200).json({
      message: `You have successfully purchased a ${product.title}`,
      coins: `Your coins: ${student.coin}`,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { buyProduct };
