import {
    Controller,
    HttpCode,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post()
    @HttpCode(200)
    @Auth('admin')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('folder') folder: string,
    ) {
        return this.fileService.saveFiles([file], folder);
    }
}
