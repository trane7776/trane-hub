export const getMovieLength = (length: number) => {
    switch (length) {
        case 1:
        case 21:
        case 31:
        case 41:
        case 51:
        case 61:
        case 71:
        case 81:
        case 91:
            return `${length} фильм`;
        case 2:
        case 3:
        case 4:
        case 22:
        case 23:
        case 24:
        case 32:
        case 33:
        case 34:
            return `${length} фильма`;
        default:
            return `${length} фильмов`;
    }
};
