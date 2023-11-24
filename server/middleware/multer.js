const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const imageFilter = function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: Hanya diizinkan mengunggah file gambar dengan format JPEG, JPG, PNG, atau GIF");
    }
};

const upload = multer({ storage, fileFilter: imageFilter });

module.exports = upload;
