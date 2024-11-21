import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.join(process.cwd(), 'uploads'),
            serveRoot: '/uploads',
        }),
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule {}
