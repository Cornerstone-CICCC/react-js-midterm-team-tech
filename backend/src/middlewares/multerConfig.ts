// middleware/multerConfig.ts
import multer from 'multer';
import os from 'os';

export const upload = multer({
    dest: os.tmpdir(),
    fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
});
