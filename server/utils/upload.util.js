const multer = require('multer');
const path = require('path');

//guardar local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'poster'));
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;

    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = { upload };
