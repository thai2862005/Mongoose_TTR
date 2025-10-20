const express = require('express');
const { create } = require('../model/kitten');
const { createUser, getAllUsers, deleteUser, updateUser, postUploadSingleFile, postUploadMultipleFiles } = require('../controller/user.controller');
const router = express.Router();

// ví dụ route
router.get("/users",getAllUsers)
router.post("/users", createUser);
router.delete("/users/:id",deleteUser);
router.put("/users/:id",updateUser);
router.post("/upload",postUploadSingleFile);
router.post("/upload/files", postUploadMultipleFiles);
const webRouter = (app) => {
    app.use('/api', router);
};

module.exports = webRouter;
