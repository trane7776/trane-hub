import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

import * as YooKassa from 'yookassa';
import { PaymentDto } from './dto/payment.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { PaymentStatus } from '@prisma/client';
import { returnPaymentObject } from './return-payment.object';

const yooKassa = new YooKassa({
    shopId: process.env['SHOP_ID'],
    secretKey: process.env['PAYMENT_TOKEN'],
});

@Injectable()
export class PaymentService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
    ) {}

    async checkout(dto: PaymentDto, userId: string) {
        const user = await this.userService.getById(userId);

        if (user.isHasPremium)
            throw new ConflictException('У пользователя уже есть премиум');

        const order = await this.prisma.payment.create({
            data: {
                status: dto.status,
                amount: dto.amount,

                user: {
                    connect: { id: userId },
                },
            },
        });

        const payment = await yooKassa.createPayment({
            amount: {
                value: dto.amount.toFixed(2),
                currency: 'RUB',
            },
            payment_method_data: {
                type: 'bank_card',
            },
            confirmation: {
                type: 'redirect',
                return_url: `${process.env['FRONTEND_URL']}/thanks`,
            },
            metadata: {
                order_id: order.id,
                user_id: user.id,
            },
            description: `Оплата подписки на TraneHub. Id платежа #${order.id},
            Id пользователя #${order.userId}.`,
        });
        return payment;
    }

    async updateStatus(dto: PaymentStatusDto) {
        if (dto.event === 'payment.succeeded') {
            const orderId = dto.object.metadata.order_id;
            const userId = dto.object.metadata.user_id;

            await this.prisma.payment.update({
                where: { id: orderId },
                data: {
                    status: PaymentStatus.SUCCESS,
                },
            });

            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    isHasPremium: true,
                },
            });
            return true;
        }

        if (dto.event === 'payment.canceled') {
            const orderId = dto.object.metadata.order_id;

            await this.prisma.payment.update({
                where: { id: orderId },
                data: {
                    status: PaymentStatus.FAILED,
                },
            });
            return true;
        }

        return true;
    }

    // Запросы для администратора

    async getAll() {
        return this.prisma.payment.findMany({
            orderBy: { createdAt: 'desc' },
            select: returnPaymentObject,
        });
    }

    async delete(id: string) {
        return this.prisma.payment.delete({
            where: { id },
        });
    }

    async cancelPayment(id: string) {
        return yooKassa.cancelPayment(id);
    }
}
