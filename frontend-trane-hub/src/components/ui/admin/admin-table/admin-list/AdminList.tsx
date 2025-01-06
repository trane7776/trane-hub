import React from 'react';

interface Props {
    className?: string;
}

export const AdminList: React.FC<Props> = ({ className }) => {
    return <div className={className}>AdminList</div>;
};
