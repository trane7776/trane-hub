import { ITokens } from '@/types/auth.types';
import Cookies from 'js-cookie';

export enum EnumTokens {
    'ACCESS_TOKEN' = 'accessToken',
    'REFRESH_TOKEN' = 'refreshToken',
}

export enum EnumStorage {
    'USER' = 'user',
}

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
    return accessToken || null;
};

export const getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem(EnumStorage.USER) || '{}');
};

export const removeFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN);
    Cookies.remove(EnumTokens.REFRESH_TOKEN);
};

export const saveTokensStorage = (data: ITokens) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, data.accessToken, {
        sameSite: 'Strict', // Запрещает передачу токена в запросах с других сайтов
    });
    Cookies.set(EnumTokens.REFRESH_TOKEN, data.refreshToken, {
        expires: 30,
        sameSite: 'Strict', // Запрещает передачу токена в запросах с других сайтов
    });
};
