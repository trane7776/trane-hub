import React from 'react';
import { IUploadField } from '../form.interface';
import { useUpload } from './useUpload';
import styles from './UploadField.module.scss';
import { cn } from '@/lib/utils';
import { SkeletonLoader } from '../../SkeletonLoader';

interface Props extends IUploadField {
    className?: string;
}

export const UploadField: React.FC<Props> = ({
    className,
    placeholder,
    error,
    folder,
    onChange,
    isImage = true,
    value,
}) => {
    const { uploadImage, isLoading } = useUpload(onChange, folder);
    return (
        <div className={cn(className, styles.upload_field)}>
            <div className={styles.upload_flex}>
                <label>
                    <span>{placeholder}</span>
                    <input
                        type="file"
                        onChange={uploadImage}
                        className="cursor-pointer"
                    />
                    {error && (
                        <div className={styles.error}>{error.message}</div>
                    )}
                </label>

                {isImage && (
                    <div className={styles.upload_image_container}>
                        {isLoading ? (
                            <SkeletonLoader className="w-full h-full" />
                        ) : (
                            value && <img src={value} alt="" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
