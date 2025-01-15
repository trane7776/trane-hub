import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Metadata } from 'next';
import { Payments } from './Payments';

export const metadata: Metadata = {
    title: 'Платежи',
    ...NO_INDEX_PAGE,
};

export default function PaymentsPage() {
    return <Payments />;
}
