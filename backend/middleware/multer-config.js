const multer = require('multer'); // handles incoming files

const MIME_TYPES = {
    'audio/mp3': 'mp3',
    'audio/mpeg': 'mp3',
    'video/mp4': 'mp4',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // filename tells multer to use the original name
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('file'); 