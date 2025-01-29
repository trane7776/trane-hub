import { cn } from '@/lib/utils';
import React from 'react';
import styles from './PremiumPlaceholder.module.scss';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';
import { Button } from '@/components/ui/form-elements/button/Button';
interface Props {
    className?: string;
}

export const PremiumPlaceholder: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(className, styles.placeholder)}>
            <div>
                <div>для просмотра фильмеца необходимо оформить подписку</div>
                <Link href={PUBLIC_URL.premium()}>
                    <Button className={styles.btn} size="sm">
                        оформить подписку
                    </Button>
                </Link>
            </div>
        </div>
    );
};
