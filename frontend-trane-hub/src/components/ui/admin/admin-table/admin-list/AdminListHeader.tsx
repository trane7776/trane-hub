import React from 'react';

interface Props {
    className?: string;
}

export const AdminListHeader: React.FC<Props> = ({ className }) => {
    return <div className={className}>AdminListHeader</div>;
};
