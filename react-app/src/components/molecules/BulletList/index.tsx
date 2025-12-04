import styles from './BulletList.module.scss';

export default function BulletList({children, className} : {children: React.ReactNode, className?: string}) {
    return (
        <ul className={`${styles.bulletList} ${className ?? ''}`}>
            {children}
        </ul>
    );
};
