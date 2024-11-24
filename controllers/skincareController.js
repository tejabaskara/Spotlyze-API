const {
  findSkincareByName,
  createSkincare,
  getAllSkincare,
  findSkincareFavoriteByName,
  createFavorite,
} = require("../models/skincareModel");

const addSkincare = async (req, res) => {
  const { name, ingredients, price, explanation } = req.body;

  console.log(req.body);

  if (!name || !ingredients || !price || !explanation) {
    return res.status(400).json({
      message:
        "Name, ingredients, price, and explaination about the product are required",
    });
  }

  try {
    const existingSkincare = await findSkincareByName(name);
    if (existingSkincare) {
      return res.status(409).json({ message: "Skincare is already exists" });
    }

    const skincareId = await createSkincare(
      name,
      ingredients,
      price,
      explanation
    );

    res
      .status(201)
      .json({ message: "Skincare added successfully", skincareId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSkincareHandler = async (req, res) => {
  try {
    const skincares = await getAllSkincare();
    res.status(200).json(skincares);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

const addSkincareFavorite = async (req, res) => {
  const { user_id, skincare_id } = req.body;

  console.log(req.body);

  if (!user_id || !skincare_id) {
    return res.status(400).json({
      message: "user_id, skincare_id are required",
    });
  }

  try {
    const existingFavorite = await findSkincareFavoriteByName(
      user_id,
      skincare_id
    );
    if (existingFavorite) {
      return res.status(409).json({ message: "Favorite is already exists" });
    }

    const favoriteId = await createFavorite(user_id, skincare_id);

    res
      .status(201)
      .json({ message: "Favorite added successfully", favoriteId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addSkincare, getAllSkincareHandler, addSkincareFavorite };
