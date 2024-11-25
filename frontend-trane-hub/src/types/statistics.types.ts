interface ITopMovie {
    title: string;
    views: number;
}

interface ISalesByWeek {
    date: string;
    total: number;
}

export interface IMiddleStatisticsResponse {
    topMovies: ITopMovie[];
    salesByWeek: ISalesByWeek[];
}

export interface IMainStatisticsResponse {
    id: number;
    title: string;
    value: number;
}
