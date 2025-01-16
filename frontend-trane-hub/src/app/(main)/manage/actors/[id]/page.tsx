import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { IPageIdParam } from '@/types/page-params.types';
import { Metadata } from 'next';
import { ActorEdit } from './ActorEdit';

export const metadata: Metadata = {
    title: 'Редактирование актера',
    ...NO_INDEX_PAGE,
};

export default function ActorEditPage({ params }: IPageIdParam) {
    return <ActorEdit actorId={params.id} />;
}
