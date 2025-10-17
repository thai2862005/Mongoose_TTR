const express = require('express');
const router = express.Router();

// ví dụ route
router.get('/', (req, res) => {
    res.send('Hello World!');
});

const webRouter = (app) => {
    app.use('/', router);
};

module.exports = webRouter;
