const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, 'uploads/')
  },

  filename(req, file, done) {
    done(null, Date.now()+'-'+file.originalname)
  }
})

const upload = multer({storage: storage});

module.exports = upload;