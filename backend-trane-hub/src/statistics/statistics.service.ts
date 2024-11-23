import { Injectable } from '@nestjs/common';

import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { PrismaService } from 'src/prisma.service';
import { ReturnSalesObject } from './return-sales.object';

dayjs.locale('ru');

@Injectable()
export class StatisticsService {
    constructor(private prisma: PrismaService) {}

    async getMainStatistics() {
        const countUsers = await this.prisma.user.count();

        const countMovies = await this.prisma.movie.count();
        const countViews = await this.prisma.movie.aggregate({
            _sum: {
                views: true,
            },
        });

        const averageRating = await this.prisma.review.aggregate({
            _avg: {
                rating: true,
            },
        });

        return [
            { id: 1, title: 'Просмотры', value: countViews._sum.views },
            { id: 2, title: 'Фильмы', value: countMovies },
            { id: 3, title: 'Пользователи', value: countUsers },
            {
                id: 4,
                title: 'Средний рейтинг',
                value: averageRating._avg.rating || 0,
            },
        ];
    }

    async getMiddleStatistics() {
        const movies = await this.prisma.movie.findMany({
            select: {
                title: true,
                views: true,
            },
        });
        const topMovies = movies.sort((a, b) => b.views - a.views).slice(0, 4);

        // Получение продаж за последние две недели
        const startDate = dayjs().subtract(14, 'days').startOf('day');
        const endDate = dayjs().endOf('day');

        const salesRaw = await this.prisma.$queryRaw<ReturnSalesObject[]>`
            SELECT DATE_TRUNC('day', "created_at") as date, SUM("amount") as total
            FROM "payments"
            WHERE "created_at" >= ${startDate.toDate()} AND "created_at" <= ${endDate.toDate()}
            GROUP BY date
            ORDER BY date;
        `;

        const salesMap = new Map();
        salesRaw.forEach((sale) => {
            const formattedDate = dayjs(sale.date).format('D MMM');
            salesMap.set(formattedDate, sale.total);
        });

        const sales = [];

        for (
            let date = startDate;
            date.isBefore(endDate);
            date = date.add(1, 'day')
        ) {
            const formattedDate = date.format('D MMM');
            sales.push({
                date: formattedDate,
                amount: salesMap.get(formattedDate) || 0,
            });
        }

        return {
            topMovies,
            sales,
        };
    }
}
