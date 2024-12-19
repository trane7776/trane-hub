'use client';
import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import styles from './Subscribe.module.scss';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/form-elements/button/Button';

interface Props {
    className?: string;
}

export const Subscribe: React.FC<Props> = ({ className }) => {
    const { user } = useProfile();
    const pathname = usePathname();
    const isAdminPage = pathname?.includes(ADMIN_URL.root());
    return (
        !isAdminPage && (
            <div className={cn(className, styles.subscribe)}>
                <h2>
                    {user?.isHasPremium
                        ? 'у вас уже имеется премиум подписка'
                        : 'подпишитесь на премиум'}
                </h2>
                <p>
                    {user?.isHasPremium
                        ? 'вы можете наслаждаться премиум контентом'
                        : 'с премиум подпиской вы получите доступ к эксклюзивному контенту'}
                </p>
                <Link
                    href={
                        user?.isHasPremium
                            ? PUBLIC_URL.explorer()
                            : PUBLIC_URL.premium()
                    }
                >
                    <Button size="sm" className={styles.button}>
                        {user?.isHasPremium
                            ? 'перейти к контенту'
                            : 'подписаться'}
                    </Button>
                </Link>
            </div>
        )
    );
};
