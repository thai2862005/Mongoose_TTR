const express = require('express');
const path = require('path');
const webRouter = require('./router/wed'); 
const fileUpload = require('express-fileupload');
const { connection } = require('./config/database');
const app = express();
const port = 3000;

// Middleware parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware upload file
app.use(fileUpload());
// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Thư mục tĩnh
app.use('/static', express.static(path.join(__dirname, 'public')));

// ===== KẾT NỐI DATABASE =====
(async () => {
  try {
    await connection();
    console.log('✅ Kết nối database thành công');

    webRouter(app);

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`🚀 Server chạy tại http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Lỗi kết nối database:', error);
  }
})();
