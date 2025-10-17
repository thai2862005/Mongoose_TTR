const User = require('../model/user');
const createUser = async (req, res) => {
    const { username, password, city } = req.body;
    await User.create({ username, password, city });
    res.status(201).json({ message: 'User created successfully' });
};

module.exports = {
    createUser
};
