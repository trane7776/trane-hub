import { IPageSlugParam } from '@/types/page-params.types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Жанр',
};

export default function GenrePage({ params }: IPageSlugParam) {
    return <div>{params.slug}</div>;
}
