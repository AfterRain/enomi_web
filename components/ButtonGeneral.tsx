import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes, Ref } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const baseStyles = {
    solid:
      'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
    outline:
      'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors'
};

type ButtonVariant = 'solid' | 'outline';
type SolidColor = 'cyan' | 'white' | 'gray';
type OutlineColor = 'gray';
type ButtonColor = SolidColor | OutlineColor;

interface VariantStyles {
    solid: Record<SolidColor, string>;
    outline: Record<OutlineColor, string>;
}

const variantStyles: VariantStyles = {
    solid: {
        cyan: 'relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
        white: 'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
        gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80'
    },
    outline: {
        gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80'
    }
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    href?: string;
}

const ButtonGeneral = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    function Button({ variant = 'solid', color = 'gray', className, href, ...props }, ref) {
        let computedStyle = "";

        if (variant === 'solid' && color in variantStyles.solid) {
            computedStyle = variantStyles.solid[color as SolidColor];
        } else if (variant === 'outline' && color in variantStyles.outline) {
            computedStyle = variantStyles.outline[color as OutlineColor];
        }

        className = clsx(baseStyles[variant], computedStyle, className);

        if (href) {
            const { onClick, ...anchorProps } = props as AnchorHTMLAttributes<HTMLAnchorElement>;
            return (
                <Link href={href} passHref>
                    <a {...anchorProps} ref={ref as Ref<HTMLAnchorElement>} className={className} />
                </Link>
            );
        } else {
            return <button {...props} ref={ref as Ref<HTMLButtonElement>} className={className} />;
        }
    }
);

export default ButtonGeneral;
