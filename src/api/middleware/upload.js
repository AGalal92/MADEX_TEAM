const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs'); // Add this at the top of your file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../storage')); // Files are stored in the 'storage' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});

// Middleware to compress images and videos
const compressFiles = async (req, res, next) => {
  if (!req.files) return next();

  try {
    for (const field in req.files) {
      for (const file of req.files[field]) {
        const filePath = path.join(__dirname, '../storage', file.filename);

        if (file.mimetype.startsWith('image')) {
          // Compress images using sharp
          const tempFilePath = path.join(__dirname, '../storage', `temp-${file.filename}`);

          await sharp(filePath)
            .resize(800) // Resize to a maximum width of 800px (adjust as needed)
            .jpeg({ quality: 80 }) // Adjust JPEG quality (0-100)
            .png({ quality: 80 }) // Adjust PNG quality (0-100)
            .toFile(tempFilePath); // Save compressed image to a temporary file

          // Replace the original file with the compressed file
          fs.unlinkSync(filePath); // Delete the original file
          fs.renameSync(tempFilePath, filePath); // Rename the compressed file to the original filename
        } else if (file.mimetype.startsWith('video')) {
          // Compress videos using fluent-ffmpeg
          const compressedFilePath = path.join(
            __dirname,
            '../storage',
            `compressed-${file.filename}`
          );

          await new Promise((resolve, reject) => {
            ffmpeg(filePath)
              .outputOptions('-crf 28') // Adjust compression ratio (lower value = better quality)
              .on('end', () => {
                // Replace the original video with the compressed one
                fs.unlinkSync(filePath); // Delete the original video
                fs.renameSync(compressedFilePath, filePath); // Rename the compressed video
                resolve();
              })
              .on('error', (err) => {
                reject(new Error(`Video compression failed: ${err.message}`));
              })
              .save(compressedFilePath); // Save the compressed video to a new file
          });
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, compressFiles };