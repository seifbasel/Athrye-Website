import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'flex h-10 items-center rounded-xl border border-input bg-background dark:bg-background-dark pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
                    className
                )}
            >
                <Search className='size-5 text-text-dark dark:text-text' />
                <input
                    {...props}
                    ref={ref}
                    className='w-full rounded-xl bg-background dark:bg-background-dark  p-2 placeholder:text-text-dark dark:placeholder:text-text focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                />
            </div>
        );
    }
);

SearchBar.displayName = 'Search';

export { SearchBar };
