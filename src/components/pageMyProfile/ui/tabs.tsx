'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/utils/UtilsPageProfile'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center gap-2 p-1 rounded-lg',
      'border-b border-[#e8f2fd]',
      'bg-transparent',
      'overflow-x-auto overflow-y-hidden',
      'scrollbar-thin scrollbar-thumb-[#e8f2fd] scrollbar-track-transparent',
      'min-h-[48px]',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap',
      'px-4 py-2 text-sm font-medium',
      'rounded-md transition-all duration-200',
      'focus-visible:outline-none',
      'focus-visible:ring-2 focus-visible:ring-[#197fe6] focus-visible:ring-offset-2',

      'text-[#595959] bg-transparent',
      'hover:text-[#1772cf] hover:bg-[#e8f2fd]',

      'data-[state=active]:text-[#197fe6]',
      'data-[state=active]:bg-[#e8f2fd]',
      'data-[state=active]:shadow-sm',

      'disabled:pointer-events-none disabled:opacity-50',

      'relative after:absolute after:bottom-[-1px] after:left-0 after:right-0',
      'after:h-0.5 after:bg-[#197fe6]',
      'after:transform after:scale-x-0 after:transition-transform',
      'data-[state=active]:after:scale-x-100',

      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 rounded-lg',
      'focus-visible:outline-none',
      'focus-visible:ring-2 focus-visible:ring-[#197fe6] focus-visible:ring-offset-2',

      'data-[state=inactive]:animate-out data-[state=inactive]:fade-out',
      'data-[state=active]:animate-in data-[state=active]:fade-in',
      'transition-all duration-200 ease-in-out',

      'p-4',

      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
