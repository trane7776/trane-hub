export const convertPrice = (price: number) => {
    return price.toLocaleString('ru-Ru', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
    });
};
