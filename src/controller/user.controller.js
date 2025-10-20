const User = require('../model/user');
const { upLoadSingleFile, upLoadMultipleFiles } = require('../services/file.service');
const createUser = async (req, res) => {
    const { username, password, city } = req.body;
    await User.create({ username, password, city });
    res.status(201).json({ message: 'User created successfully' });
};
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, city } = req.body;
    await User.updateOne({ _id: id }, { username, password, city });
    res.status(200).json({ message: 'User updated successfully' });
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: 'User deleted successfully' });
};

const postUploadSingleFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    try {
        const uploadPath = await upLoadSingleFile(req.files.image);
        res.status(200).json({ message: 'File uploaded successfully', path: uploadPath });
    } catch (error) {
        res.status(500).json({ message: 'File upload failed', error });
    }
};
const postUploadMultipleFiles = async (req, res) => {
  if (!req.files || !req.files.images) {
    return res.status(400).send('No files were uploaded.');
  }

  try {
    const uploadedPaths = await upLoadMultipleFiles(req.files.images);

    res.status(200).json({
      message: 'Files uploaded successfully',
      files: uploadedPaths,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: 'Files upload failed',
      error: error.message || error,
    });
  }
};


module.exports = {
    postUploadMultipleFiles,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    postUploadSingleFile
};
