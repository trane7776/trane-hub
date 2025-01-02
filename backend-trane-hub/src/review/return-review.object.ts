import { returnUserObject } from 'src/user/return-user.object';
import { Prisma } from '@prisma/client';

export const returnReviewObject: Prisma.ReviewSelect = {
    id: true,
    createdAt: true,
    text: true,
    rating: true,
    user: {
        select: returnUserObject,
    },
};
