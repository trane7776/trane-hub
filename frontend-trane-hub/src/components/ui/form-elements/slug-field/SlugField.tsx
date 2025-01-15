import { cn } from '@/lib/utils';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Field } from '../field/Field';
import styles from './SlugField.module.scss';
interface Props {
    className?: string;
    error?: FieldError;
    register: UseFormRegister<any>;
    generate: () => void;
}

export const SlugField: React.FC<Props> = ({
    className,
    error,
    register,
    generate,
}) => {
    return (
        <div className={cn(className, 'relative')}>
            <Field
                {...register('slug', {
                    required: 'ссылка обязательна',
                })}
                placeholder="ссылка"
                error={error}
            />
            <div className={styles.badge} onClick={generate}>
                сгенерировать
            </div>
        </div>
    );
};
