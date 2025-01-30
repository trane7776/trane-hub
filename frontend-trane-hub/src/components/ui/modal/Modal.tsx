import React, { PropsWithChildren, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { cn } from '@/lib/utils';
import { RiCloseFill } from 'react-icons/ri';
interface Props {
    className?: string;
    isOpen: boolean;
    closeModal: () => void;
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({
    className,
    children,
    isOpen,
    closeModal,
}) => {
    const modalRef = useRef<HTMLElement | null>(
        document.getElementById('modal')
    );

    if (!modalRef.current || !isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={cn(className, styles.overlay)}>
            <div className={styles.window}>
                <button className={styles.close} onClick={closeModal}>
                    <RiCloseFill />
                </button>
                {children}
            </div>
        </div>,
        modalRef.current
    );
};
