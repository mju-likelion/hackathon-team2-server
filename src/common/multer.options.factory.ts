import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { basename, extname, join } from 'path';

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
        const filename = basename(file.originalname, ext);
        done(null, `${filename}_${count}${ext}`);
        count += 1;
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  };
}
