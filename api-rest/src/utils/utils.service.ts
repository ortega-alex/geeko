import { HttpException, Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { Jimp } from 'jimp';

@Injectable()
export class UtilsService {
    generateUUID() {
        return uuidv4();
    }

    async saveFile(file: Express.Multer.File) {
        const uuid = this.generateUUID();
        const filename = uuid + extname(file.originalname);
        const uri = '../../public';
        const fordel = 'uploads';
        const uploadDir = join(__dirname, uri, fordel);
        if (!fs.existsSync(uploadDir))
            fs.mkdirSync(uploadDir, { recursive: true });

        let buffer = file.buffer;
        if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
            try {
                const image = await Jimp.read(file.buffer);
                buffer = await image.resize({ w: 512 }).getBuffer('image/jpeg');
            } catch (error) {
                console.log(error);
            }
        }

        fs.writeFileSync(join(uploadDir, filename), buffer);
        return join(fordel, filename);
    }
}
