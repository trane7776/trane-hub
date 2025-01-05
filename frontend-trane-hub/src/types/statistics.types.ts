export interface ITopMovie {
    title: string;
    views: number;
}

export interface ISalesByWeek {
    date: string;
    amount: number;
}

export interface IMiddleStatisticsResponse {
    topMovies: ITopMovie[];
    sales: ISalesByWeek[];
}

export interface IMainStatisticsResponse {
    id: number;
    title: string;
    value: number;
}
