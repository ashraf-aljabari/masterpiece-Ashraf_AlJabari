import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

let gfs;

const connect = mongoose.connection;

connect.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, { bucketName: 'uploads' });
});

// --Description: Load Image from the database
// --Route: GET /api/images/:filename.
// --Access: public
const previewImage = asyncHandler(async (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {
    if (!file[0] || file.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No files available',
      });
    }
    if (
      file[0].contentType === 'image/jpeg' ||
      file[0].contentType === 'image/png' ||
      file[0].contentType === 'image/gif'
    ) {
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404);
      throw new Error('not an image');
    }
  });
});

// --Description: Delete Image from Database.
// --Route: DELETE /api/images/:filename.
// --Access: private
const deleteImage = asyncHandler(async (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {
    if (!file[0] || file.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No files available',
      });
    }
    gfs.delete(new mongoose.Types.ObjectId(file[0]._id), (err, data) => {
      if (err) {
        return res.status(404).json({ err: err });
      }

      res.status(200).json({
        success: true,
        message: 'File was deleted successfully',
      });
    });
  });
});

export { previewImage, deleteImage };
