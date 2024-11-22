import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { CreateReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UsePipes(new ValidationPipe())
    @Post('leave/:movieId')
    @Auth()
    async create(
        @CurrentUser('id') userId: string,
        @Param('movieId') movieId: string,
        @Body() dto: CreateReviewDto,
    ) {
        return this.reviewService.sendReview(userId, movieId, dto);
    }

    // Запросы для админа
    @Get()
    @Auth('admin')
    async getAll() {
        return this.reviewService.getAll();
    }

    @Delete(':id')
    @Auth('admin')
    async deleteById(@Param('id') id: string) {
        const deletedReview = await this.reviewService.delete(id);
        if (!deletedReview) throw new NotFoundException('Отзыв не найден');
        return deletedReview;
    }
}
