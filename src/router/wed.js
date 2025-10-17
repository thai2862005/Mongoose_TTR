const express = require('express');
const { create } = require('../model/kitten');
const { createUser } = require('../controller/user.controller');
const router = express.Router();

// ví dụ route
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post("/users", createUser);

const webRouter = (app) => {
    app.use('/api', router);
};

module.exports = webRouter;
