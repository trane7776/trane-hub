import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Админ панель',
    ...NO_INDEX_PAGE,
};

export default function AdminPage() {
    return <div>Admin</div>;
}
