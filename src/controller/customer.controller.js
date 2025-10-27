const mongoose = require('mongoose');
const Customer = require('../model/customer');
const { upLoadSingleFile } = require('../services/file.service');
const { createCustomer, deleteCustomer, updateCustomer, CreateArrayCustomer,getAllCustomer } = require('../services/customer.service');
const getAllCustomersApi = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10; 
    let page = parseInt(req.query.page) || 1;   

    const result = await getAllCustomer(limit, page);

    res.status(200).json({
      success: true,
      message: "Lấy danh sách khách hàng thành công",
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra khi lấy danh sách khách hàng"
    });
  }
};

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
const getCustomerByIdApi = async (req, res) => {
    const { id } = req.params;
    const customer = await getCustomerById(id);
    if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer); 
}

const handleCreateArrayCustomer = async (req, res) => {
    try {
        const data = req.body; // Expecting an array of customer objects in the request body
        const result = await CreateArrayCustomer(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating customers', error: error.message });
    }
}
module.exports = {
    getCustomerByIdApi,
    getAllCustomersApi,
    postCreateCustomer,
    deleteCustomerApi,
    updateCustomerApi,
    handleCreateArrayCustomer
};