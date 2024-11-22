import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from './dto/review.dto';
import { returnReviewObject } from './return-review.object';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) {}

    async sendReview(userId: string, movieId: string, dto: CreateReviewDto) {
        return this.prisma.review.create({
            data: {
                ...dto,
                user: { connect: { id: userId } },
                movie: { connect: { id: movieId } },
            },
        });
    }

    // запрос для админа
    async getAll() {
        return this.prisma.review.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: returnReviewObject,
        });
    }

    async delete(id: string) {
        return this.prisma.review.delete({
            where: { id },
        });
    }
}
