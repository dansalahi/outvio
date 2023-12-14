import { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ onClick, type = 'button', className, children, disabled, ...rest }) => {
    const baseClasses = 'bg-black hover:bg-gray-100 cursor-pointer border border-gray-800 hover:text-black text-white font-bold py-2 px-4 rounded';
    const disabledClasses = 'opacity-50 cursor-not-allowed';
    const combinedClasses = twMerge(`${className || ''} ${baseClasses} ${disabled ? disabledClasses : ''} `);

    return (
        <button type={type} className={combinedClasses} onClick={onClick} disabled={disabled} {...rest}>
            {children}
        </button>
    );
};

export default Button;
