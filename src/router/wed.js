const express = require('express');
const { create } = require('../model/kitten');
const { createUser, getAllUsers, deleteUser, updateUser } = require('../controller/user.controller');
const router = express.Router();

// ví dụ route
router.get("/users",getAllUsers)
router.post("/users", createUser);
router.delete("/users/:id",deleteUser);
router.put("/users/:id",updateUser);
const webRouter = (app) => {
    app.use('/api', router);
};

module.exports = webRouter;
