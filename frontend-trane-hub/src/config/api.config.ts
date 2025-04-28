const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export const SERVER_URL = API_BASE;
export const API_URL = {
    root: (url = '') => `${url ? url : ''}`,
    auth: (url = '') => API_URL.root(`/auth${url}`),
    users: (url = '') => API_URL.root(`/users${url}`),
    movies: (url = '') => API_URL.root(`/movies${url}`),
    genres: (url = '') => API_URL.root(`/genres${url}`),
    actors: (url = '') => API_URL.root(`/actors${url}`),
    reviews: (url = '') => API_URL.root(`/reviews${url}`),
    files: (url = '') => API_URL.root(`/files${url}`),
    statistics: (url = '') => API_URL.root(`/statistics${url}`),
    payments: (url = '') => API_URL.root(`/payments${url}`),
};
