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
                    // Base styles
                    'flex w-full text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                    // Variant styles
                    variant === 'default' && 'rounded-md border border-input px-3 py-2 focus-visible:ring-2 focus-visible:ring-ring',
                    variant === 'ghost' && 'bg-transparent border-none p-0 focus-visible:ring-0', // No internal padding/border
                    // Size styles
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