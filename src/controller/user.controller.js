const User = require('../model/user');
const createUser = async (req, res) => {
    const { username, password, city } = req.body;
    await User.create({ username, password, city });
    res.status(201).json({ message: 'User created successfully' });
};
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, city } = req.body;
    await User.updateOne({ _id: id }, { username, password, city });
    res.status(200).json({ message: 'User updated successfully' });
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: 'User deleted successfully' });
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
