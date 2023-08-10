import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

export function multerOptionsFactory(): MulterOptions {
  let count = 0;

  return {
    storage: diskStorage({
      destination(req, file, callback) {
        const filePath = 'uploads';
        if (!existsSync(filePath)) {
          mkdirSync(filePath);
        }
        callback(null, join(process.cwd(), 'uploads'));
      },

      filename(req, file, done) {
        const ext = extname(file.originalname);
        done(null, `seoulStoreInfo${count}${ext}`);
        count += 1;
      },
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
  };
}
