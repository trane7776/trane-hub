import React from 'react';

import styles from './SalesChart.module.scss';
import { ISalesByWeek } from '@/types/statistics.types';
import { cn } from '@/lib/utils';
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    Rectangle,
} from 'recharts';
import { SalesChartTooltip } from './SalesChartTooltip';

interface Props {
    className?: string;
    data: ISalesByWeek[];
}

export const SalesChart: React.FC<Props> = ({ className, data }) => {
    return (
        <div className={cn(className, styles.sales_chart)}>
            <ResponsiveContainer width="100%" height={390}>
                <BarChart data={data} width={500} height={300}>
                    <XAxis
                        tickLine={false}
                        axisLine={false}
                        dataKey="date"
                        style={{ fontSize: '12px' }}
                        tickMargin={12}
                    />
                    <Tooltip
                        content={<SalesChartTooltip />}
                        cursor={{
                            fill: 'transparent',
                        }}
                    />
                    <Bar
                        dataKey="amount"
                        fill="#b61c1c"
                        activeBar={<Rectangle fill="#9d1c1c" />}
                        radius={[10, 10, 0, 0]}
                        barSize={35}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
