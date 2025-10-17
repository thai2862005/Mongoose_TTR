const mongoose = require("mongoose");
const dbState = [
  { value: 0, label: "disconnected" },
  { value: 1, label: "connected" },
  { value: 2, label: "connecting" },
  { value: 3, label: "disconnecting" }
];

const options = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  authSource: "admin"
};

const connection = async () => {
  try {
    const state = Number(mongoose.connection.readyState);
    console.log("Trạng thái trước khi connect:", dbState.find(f => f.value === state).label);

    await mongoose.connect("mongodb://127.0.0.1:27017/api_test", options);

    console.log("✅ Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
  }
};

module.exports = { connection };
