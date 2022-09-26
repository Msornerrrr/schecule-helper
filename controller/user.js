const User = require('../model/User');

const register = async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;
}

module.exports = { register, login };