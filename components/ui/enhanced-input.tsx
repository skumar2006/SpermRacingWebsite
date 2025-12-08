import * as React from 'react';
import { cn } from '@/lib/utils';

export interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-[0.35rem] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-100 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-yellow-100 transition-all duration-200 hover:border-yellow-100/50 focus:border-yellow-100',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
EnhancedInput.displayName = 'EnhancedInput';

export { EnhancedInput };
