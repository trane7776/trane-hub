import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorController {
    constructor(private readonly actorService: ActorService) {}
    @Get()
    async getAll(@Query('searchTerm') searchTerm?: string) {
        return this.actorService.getAll(searchTerm);
    }

    @Get('by-slug/:slug')
    async getBySlug(@Param('slug') slug: string) {
        return this.actorService.getBySlug(slug);
    }

    // Запросы для админа
    @Get('by-id/:id')
    @Auth('admin')
    async getById(@Param('id') id: string) {
        return this.actorService.getById(id);
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @Auth('admin')
    async create() {
        return this.actorService.create();
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @Auth('admin')
    @HttpCode(200)
    async updateById(@Param('id') id: string, @Body() dto: UpdateActorDto) {
        const updatedActor = await this.actorService.update(id, dto);
        if (!updatedActor) throw new NotFoundException('Актер не найден');
        return updatedActor;
    }

    @Delete(':id')
    @Auth('admin')
    async deleteById(@Param('id') id: string) {
        const deletedActor = await this.actorService.delete(id);
        if (!deletedActor) throw new NotFoundException('Актер не найден');
        return deletedActor;
    }
}
