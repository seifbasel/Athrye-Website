import { cn } from '@/lib/utils';
import * as React from 'react';

interface CustomInputProps {
    variant?: 'default' | 'ghost'; // Added ghost variant
    inputSize?: 'sm' | 'lg' | 'default';
}

type InputProps = CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant = 'default', inputSize = 'default', ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex w-full text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
                    variant === 'default' && 'rounded-xl border border-border bg-card/90 px-3 py-2 shadow-soft focus-visible:ring-2 focus-visible:ring-ring',
                    variant === 'ghost' && 'bg-transparent border-none p-0 shadow-none focus-visible:ring-0',
                    {
                        'h-8 text-xs': inputSize === 'sm' && variant !== 'ghost',
                        'h-12 text-lg': inputSize === 'lg' && variant !== 'ghost',
                        'h-10 text-sm': inputSize === 'default' && variant !== 'ghost',
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
