const Customer = require('../model/customer');
const createCustomer = async (data) => {
    const dataCustomer = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        Images: data.Images
    }
    await Customer.create(dataCustomer);
}

const deleteCustomer = async (id) => {
    await Customer.deleteOne({ _id: id });
}
const updateCustomer = async (id, data) => {
    const dataCustomer = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        Images: data.Images
    }
    await Customer.updateOne({ _id: id }, dataCustomer);
}
module.exports = {
    createCustomer,
    deleteCustomer,
    updateCustomer
};