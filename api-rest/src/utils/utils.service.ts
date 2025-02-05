import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class UtilsService {
    generateUUID() {
        return uuidv4();
    }

    saveFile(file: Express.Multer.File) {
        const uuid = this.generateUUID();
        const filename = uuid + extname(file.originalname);
        const uri = '../../public';
        const fordel = 'uploads';
        const uploadDir = join(__dirname, uri, fordel);
        if (!fs.existsSync(uploadDir))
            fs.mkdirSync(uploadDir, { recursive: true });
        fs.writeFileSync(join(uploadDir, filename), file.buffer);
        return join(fordel, filename);
    }
}
