import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { IPageIdParam } from '@/types/page-params.types';
import { Metadata } from 'next';
import { GenreEdit } from './GenreEdit';

export const metadata: Metadata = {
    title: 'Редактирование жанра',
    ...NO_INDEX_PAGE,
};

export default function GenreEditPage({ params }: IPageIdParam) {
    return <GenreEdit genreId={params.id} />;
}
