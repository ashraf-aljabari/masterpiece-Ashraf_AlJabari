import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadImageMiddleware.js';
import { previewImage, deleteImage } from '../controllers/imageControllers.js';
const router = express.Router();

router.route('/').post(upload.single('file'), (req, res) => {
  if (
    !req.file ||
    req.file.mimetype === 'image/png' ||
    req.file.mimetype === 'image/jpeg' ||
    req.file.mimetype === 'image/gif'
  ) {
    res.json({ filename: req.file.filename });
  } else {
    res.status(401);
    throw new Error('Wrong file format');
  }
});

router.get('/:filename', previewImage);

router.route('/delete/:filename').delete(deleteImage);

export default router;
