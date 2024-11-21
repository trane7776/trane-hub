import { Injectable } from '@nestjs/common';
import { FileResponse } from './file.interface';
import { ensureDir, writeFile } from 'fs-extra';
import * as path from 'path';

@Injectable()
export class FileService {
    async saveFiles(
        files: Express.Multer.File[],
        folder: string = 'default',
    ): Promise<FileResponse[]> {
        const uploadFolder = path.join(process.cwd(), 'uploads', folder);
        await ensureDir(uploadFolder);
        const res: FileResponse[] = await Promise.all(
            files.map(async (file) => {
                await writeFile(
                    path.join(uploadFolder, file.originalname),
                    file.buffer,
                );
                return {
                    url: `/uploads/${folder}/${file.originalname}`,
                    name: file.originalname,
                };
            }),
        );

        return res;
    }
}
