const { findUserById, updateUser } = require("../models/userModel");

const getProfile = async (req, res) => {
  try {
    id = req.params.id;
    const history = await findUserById(id);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const user_id = req.params.id; // Ambil parameter id dari request
    const updateData = req.body; // Ambil data yang akan diupdate dari request body

    // Pastikan data untuk update tidak kosong
    if (!Object.keys(updateData).length) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    // Panggil fungsi untuk mengupdate data di database
    const result = await updateUser(user_id, updateData);

    // Jika data tidak ditemukan, kirim response 404
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Response berhasil
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

module.exports = { getProfile, updateUserHandler };