import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';
import mongoose from 'mongoose';

const storage = new GridFsStorage({
  url:
    'mongodb+srv://ashraf:Password@1996@complaint.gquo8.mongodb.net/db?retryWrites=true&w=majority',
  file: (req, file) => {
    if (
      !file ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif'
    ) {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          };
          resolve(fileInfo);
        });
      });
    } else {
      console.log('wrong file format');
    }
  },
});

const upload = multer({ storage });

export default upload;
