import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react'

type AppSubmitButtonProps = {
    isPending: boolean;
    children: React.ReactNode;
    pendingLabel?: string;
    className?: string;
    disabled?:boolean
}

function AppSubmitButton = ({
    isPending,
    children,
    pendingLabel = "submitting.....",
    className,
    disabled = false,

}: AppSubmitButtonProps) => {
    const isDisabled = disabled || isPending
  return (
      <Button
          type={sub}
          disabled={isDisabled} className={cn("w-full", className)}
      >
          {isPending ? pendingLabel : children}
      </Button>
  )
}

export default AppSubmitButton