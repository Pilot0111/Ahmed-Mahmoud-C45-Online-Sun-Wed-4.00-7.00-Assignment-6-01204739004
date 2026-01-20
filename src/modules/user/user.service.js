import { userModel } from "../../DB/models/user.model.js";


export const getUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    return res.status(200).json({ message: "done", users: users });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existUser = await userModel.findOne({ where: { email } });
    if (existUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    // const user = userModel.build({ name, email, password, role });
    // await user.save();
    const user = await userModel.create({ name, email, password, role });
    return res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
    return res.status(400).json({ message: "Error creating user", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    await userModel.upsert({ id, name, email, password,role }, { validate: false });
    return res.status(200).json({ message: "User created or updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await userModel.findOne({ where: { email } });
    return user ? res.status(200).json({ user }) : res.status(404).json({ message: "no user found" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id, { attributes: { exclude: ["role"] } });
    return user ? res.status(200).json(user) : res.status(404).json({ message: "no user found" });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.message });
  }
};