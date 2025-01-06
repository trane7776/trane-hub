import React, { ChangeEvent } from 'react';

import styles from './AdminHeader.module.scss';
import { cn } from '@/lib/utils';
import { SearchField } from '@/components/ui/search-field/SearchField';
import { AdminCreateButton } from './AdminCreateButton';

interface Props {
    className?: string;
    onClick?: () => void;
    searchTerm: string;
    setSearchTerm: (str: string) => void;
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AdminHeader: React.FC<Props> = ({
    className,
    onClick,
    searchTerm,
    handleSearch,
    setSearchTerm,
}) => {
    return (
        <div className={cn(className, styles.header)}>
            <SearchField
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                setSearchTerm={setSearchTerm}
            />
            {onClick && <AdminCreateButton onClick={onClick} />}
        </div>
    );
};
