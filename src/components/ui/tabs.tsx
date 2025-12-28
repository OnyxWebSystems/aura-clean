import * as React from 'react';
import { cn } from '../../utils/cn';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs = ({ value, defaultValue, onValueChange, children }: TabsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const setValue = isControlled ? onValueChange || (() => {}) : setInternalValue;

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: setValue }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1', className)}
      {...props}
    />
  )
);
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const isActive = context?.value === value;

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive ? 'bg-white text-[#1a1a2e] shadow-sm' : 'text-gray-600 hover:text-[#1a1a2e]',
        className
      )}
      onClick={() => context?.onValueChange(value)}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) return null;

  return (
    <div
      ref={ref}
      className={cn('mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2', className)}
      {...props}
    />
  );
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };

