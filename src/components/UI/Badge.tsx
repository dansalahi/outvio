import { FC } from "react";

type Props = {
    children: string;
    className?: string;
}

const Badge: FC<Props> = ({ children, className }) => {
    const baseClasses = 'inline-block text-xs font-normal rounded-full px-3 py-1';
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <span className={combinedClasses}>
            {children}
        </span>
    );
};

export default Badge;
