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
    const getCustomerById = async (id) => {
    return await Customer.findById(id);
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

const CreateArrayCustomer = async (data) => {
    try {
        const result = await Customer.insertMany(data);
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteCustomerArray = async (ids) => {
    try {
        const result = await Customer.deleteMany({ _id: { $in: ids } });
        return result;
    } catch (error) {
        throw error;
    }
}
const getAllCustomer = async(limit,page)=>{
    try {
        let result = null
        if(limit && page){
            let offset = (page -1 )*5;
            result = await Customer.find({}).skip(offset).limit(limit);
        }else{
            result = await Customer.find({});
        }
        return result;
    } catch (error) {
        throw error;
        
    }
}
module.exports = {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    deleteCustomer,
    CreateArrayCustomer,
    deleteCustomerArray
};