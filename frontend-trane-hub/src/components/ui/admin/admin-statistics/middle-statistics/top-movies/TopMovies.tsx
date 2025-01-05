import React from 'react';
import styles from './TopMovies.module.scss';
import { ITopMovie } from '@/types/statistics.types';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { cn } from '@/lib/utils';
import { TopMoviesTooltip } from './TopMoviesTooltip';

const COLORS = ['#b61c1c', '#822a2a', '#790a0a', '#5d0b0b'];

interface Props {
    className?: string;
    data: ITopMovie[];
}

export const TopMovies: React.FC<Props> = ({ className, data }) => {
    return (
        <div className={cn(className, styles.top_movies)}>
            <ResponsiveContainer width="100%" height={390}>
                <PieChart>
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="right"
                        iconType="circle"
                        content={({ payload }: any) => {
                            return (
                                <ul>
                                    {payload.map(
                                        (entry: any, index: number) => (
                                            <li key={index}>
                                                {entry.payload.title}
                                            </li>
                                        )
                                    )}
                                </ul>
                            );
                        }}
                    />
                    <Tooltip content={<TopMoviesTooltip />} />
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={60}
                        paddingAngle={4}
                        stroke="none"
                        dataKey="views"
                        labelLine={false}
                    >
                        {data.map((_entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                                style={{ outline: 'none' }}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
