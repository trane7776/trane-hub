import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import { Metadata } from 'next';
import styles from './Thanks.module.scss';
import { Heading } from '@/components/ui/heading/Heading';
import { Button } from '@/components/ui/form-elements/button/Button';
import Link from 'next/link';
import { DASHBOARD_URL } from '@/config/url.config';
export const metadata: Metadata = {
    title: 'Успешная покупка',
    ...NO_INDEX_PAGE,
};

export default function ThanksPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.area}>
                <Heading>успешная покупка</Heading>
                <p>спасибо за приобретение на нашем сайте</p>
                <Link href={DASHBOARD_URL.root()}>
                    <Button>перейти в дашборд</Button>
                </Link>
            </div>
        </div>
    );
}
