import { PUBLIC_URL } from '@/config/url.config';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Metadata } from 'next';
import Link from 'next/link';
import styles from './NotFound.module.scss';
import { Heading } from '@/components/ui/heading/Heading';
export const metadata: Metadata = {
    title: '404. страница не найдена',
    ...NO_INDEX_PAGE,
};

export default function NotFoundPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.area}>
                <Heading>404. страница не найдена</Heading>
                <p>хм, походу страница не существует(</p>
                <Link href={PUBLIC_URL.home()} className={styles.link}>
                    перейти на главную
                </Link>
            </div>
        </div>
    );
}
