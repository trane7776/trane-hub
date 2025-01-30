'use client';
import { DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config';
import { useProfile } from '@/hooks/useProfile';
import { paymentService } from '@/services/payment.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import styles from './Premium.module.scss';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui/heading/Heading';
import { convertPrice } from '@/utils/string/convertPrice';
import { BsCheckCircle } from 'react-icons/bs';
import { Button } from '@/components/ui/form-elements/button/Button';
import { LuLoader } from 'react-icons/lu';
import { Loader } from '@/components/ui/Loader';
interface Props {
    className?: string;
}

export const Premium: React.FC<Props> = ({ className }) => {
    const { push } = useRouter();
    const { user, isLoading } = useProfile();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create payment'],
        mutationFn: (amount: number) => paymentService.checkout(amount),
        onSuccess({ data }) {
            push(data.confirmation.confirmation_url);
        },
        onError() {
            toast.error('ошибка при создании платежа');
        },
    });

    const handleClick = (amount: number) => {
        user?.isHasPremium
            ? push(DASHBOARD_URL.root())
            : user
            ? mutate(amount)
            : push(PUBLIC_URL.auth());
    };
    return (
        <div className={cn(className, styles.wrapper)}>
            <Heading className={styles.heading}>оформить подписку</Heading>
            <div className={styles.description}>
                Оформите подписку и получите доступ к премиум-функциям платформы
            </div>
            <div className={styles.card_wrapper}>
                <div className={styles.plan}>
                    <h1 className={styles.heading}>{convertPrice(5000)}</h1>
                    <ul className={styles.features}>
                        <li className={styles.feature}>
                            <BsCheckCircle className={styles.icon} />
                            отсутствие рекламы
                        </li>
                        <li className={styles.feature}>
                            <BsCheckCircle className={styles.icon} />
                            доступ к премиум-контенту
                        </li>
                        <li className={styles.feature}>
                            <BsCheckCircle className={styles.icon} />
                            высокое качество видео
                        </li>
                    </ul>
                    <Button
                        onClick={() => handleClick(5000)}
                        className={styles.button}
                    >
                        {isLoading || isPending ? (
                            <Loader />
                        ) : user?.isHasPremium ? (
                            'перейти в дашборд'
                        ) : (
                            'оформить подписку'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
