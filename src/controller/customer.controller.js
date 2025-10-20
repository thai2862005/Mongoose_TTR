const mongoose = require('mongoose');
const Customer = require('../model/customer');
const { upLoadSingleFile } = require('../services/file.service');
const { createCustomer, deleteCustomer, updateCustomer } = require('../services/customer.service');
const getAllCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.status(200).json(customers);
}
const postCreateCustomer = async (req, res) => {
    const { name, email, phone } = req.body;
    let ImagesUrl = "";
    let result = await upLoadSingleFile(req.files.image);
    ImagesUrl = result;
    const dataCustomer = {
        name,
        email,
        phone,
        Images: ImagesUrl
    }
    await createCustomer(dataCustomer);
    res.status(201).json({ message: 'Customer created successfully' });
}
const deleteCustomerApi = async (req, res) => {
    const {id}= req.params;
    await deleteCustomer(id);
    res.status(200).json({ message: 'Customer deleted successfully' });
}
const updateCustomerApi = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    let ImagesUrl = "";
    let result = await upLoadSingleFile(req.files.image);
    ImagesUrl = result; 
    const dataCustomer = {
        name,
        email,
        phone,
        Images: ImagesUrl
    }
    await updateCustomer(id, dataCustomer);
    res.status(200).json({ message: 'Customer updated successfully' });
}
module.exports = {
    getAllCustomers,
    postCreateCustomer,
    deleteCustomerApi,
    updateCustomerApi
};