import * as React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md active:scale-[0.98]',
          {
            'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg': variant === 'default',
            'border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-emerald-500': variant === 'outline',
            'hover:bg-gray-100': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg': variant === 'destructive',
            'h-10 px-4 py-2': size === 'default',
            'h-9 px-3 text-xs': size === 'sm',
            'h-12 px-8 text-base': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };

