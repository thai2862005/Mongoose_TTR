const express = require('express');
const { create } = require('../model/kitten');
const { createUser, getAllUsers, deleteUser, updateUser, postUploadSingleFile, postUploadMultipleFiles } = require('../controller/user.controller');
const { getAllCustomers, postCreateCustomer, deleteCustomerApi, updateCustomerApi } = require('../controller/customer.controller');
const router = express.Router();
//users routes
router.get("/users",getAllUsers);
router.post("/users", createUser);
router.delete("/users/:id",deleteUser);
router.put("/users/:id",updateUser);
//file upload routes
router.post("/upload",postUploadSingleFile);
router.post("/upload/files", postUploadMultipleFiles);
//customer routes
router.get("/customers",getAllCustomers);
router.post("/customers",postCreateCustomer);
router.delete("/customers/:id",deleteCustomerApi);
router.put("/customers/:id",updateCustomerApi);
const webRouter = (app) => {
    app.use('/api', router);
};

module.exports = webRouter;
