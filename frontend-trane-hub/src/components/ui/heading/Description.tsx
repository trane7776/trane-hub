import { cn } from '@/lib/utils';
import { FC } from 'react';
import parse from 'html-react-parser';

interface Props {
    text: string;
    className?: string;
}

export const Description: FC<Props> = ({ text, className }) => {
    return <div className={cn(className, 'text-white/60')}>{parse(text)}</div>;
};
