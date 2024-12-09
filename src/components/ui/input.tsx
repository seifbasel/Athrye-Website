import { cn } from '@/lib/utils';
import * as React from 'react';
interface CustomInputProps {
    border?: boolean;
    inputSize?: 'sm' | 'lg' | 'default';
}

type InputProps = CustomInputProps &
    React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, type, border = true, inputSize = 'default', ...props },
        ref
    ) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex w-full bg-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    border
                        ? 'rounded-md border border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                        : 'border-input transition-colors hover:border-b focus-visible:border-b focus-visible:border-primary',
                    {
                        'h-8 text-xs': inputSize === 'sm',
                        'h-12 text-lg': inputSize === 'lg',
                        'h-10 text-sm': inputSize === 'default',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };
