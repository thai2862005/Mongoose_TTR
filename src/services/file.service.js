// src/services/file.service.js
const path = require('path');
const fs = require('fs');

const upLoadSingleFile = async (file) => {
  // Đường dẫn đến thư mục uploads
  const uploadDir = path.resolve(__dirname, '../public/images/uploads');

  // Nếu thư mục chưa tồn tại -> tạo mới
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Tạo tên file duy nhất
  const extName = path.extname(file.name);
  const baseName = path.basename(file.name, extName);
  const finalName = `${baseName}-${Date.now()}${extName}`;
  const finalPath = path.join(uploadDir, finalName);

  await file.mv(finalPath);

  return `/images/uploads/${finalName}`;
};
const upLoadMultipleFiles = async (files) => {
  const results = [];

  const fileArray = Array.isArray(files) ? files : [files];

  for (const file of fileArray) {
    const uploadedPath = await upLoadSingleFile(file);
    results.push(uploadedPath);
  }

  return results;
};
module.exports = {
  upLoadSingleFile,
  upLoadMultipleFiles
};
