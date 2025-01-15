import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Metadata } from 'next';
import { Actors } from './Actors';

export const metadata: Metadata = {
    title: 'Актеры',
    ...NO_INDEX_PAGE,
};

export default function ActorsPage() {
    return <Actors />;
}
