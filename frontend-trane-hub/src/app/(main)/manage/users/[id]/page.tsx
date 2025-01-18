import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { IPageIdParam } from '@/types/page-params.types';
import { Metadata } from 'next';
import { UserEdit } from './UserEdit';

export const metadata: Metadata = {
    title: 'Редактирование пользователя',
    ...NO_INDEX_PAGE,
};

export default function UserEditPage({ params }: IPageIdParam) {
    return <UserEdit userId={params.id} />;
}
