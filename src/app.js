const express = require('express');
const path = require('path');
const webRouter = require('./router/wed'); // CommonJS import
const { connection } = require('./config/database');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Thư mục tĩnh
app.use('/static', express.static(path.join(__dirname, 'public')));
const kittyShcema = new mongoose.Schema({ name: String });
const Kitten = mongoose.model('Kitten', kittyShcema);
const cat = new Kitten({ name: 'HHT' });
cat.save();

// Sử dụng router
webRouter(app);
connection();
try {
  (async () => {
    await connection();
    console.log('Kết nối database thành công trong app.js');
  })();
} catch (error) {
  console.error('Lỗi kết nối trong app.js:', error);
}
// Route ví dụ
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
