import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config';
import { IMenu } from './menu.interface';

export const userMenu: IMenu = {
    title: 'меню',
    items: [
        {
            icon: 'LuCompass',
            value: 'главная',
            link: PUBLIC_URL.home(),
        },
        {
            icon: 'LuClapperboard',
            value: 'фильмы',
            link: PUBLIC_URL.explorer(),
        },
        {
            icon: 'LuFlame',
            value: 'тренды',
            link: PUBLIC_URL.trending(),
        },
    ],
};

export const adminMenu: IMenu = {
    title: 'меню',
    items: [
        {
            icon: 'LuLayoutDashboard',
            link: ADMIN_URL.root(),
            value: 'статистика',
        },
        {
            icon: 'LuTv',
            link: ADMIN_URL.movies(),
            value: 'фильмы',
        },
        {
            icon: 'LuUsers',
            link: ADMIN_URL.users(),
            value: 'пользователи',
        },
        {
            icon: 'LuBook',
            link: ADMIN_URL.genres(),
            value: 'жанры',
        },
        {
            icon: 'LuBookDown',
            link: ADMIN_URL.actors(),
            value: 'актеры',
        },
        {
            icon: 'LuStar',
            link: ADMIN_URL.reviews(),
            value: 'отзывы',
        },
        {
            icon: 'LuCreditCard',
            link: ADMIN_URL.payments(),
            value: 'платежи',
        },
    ],
};
