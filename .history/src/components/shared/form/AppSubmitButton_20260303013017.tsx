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

function AppSubmitButton =({
    isPending,
    children,
    pendingLabel = "submitting.....",
    className,
    disabled = false,

}: AppSubmitButtonProps) => {
    const isDisabled = disabled || isPending
  return (
      <Button
          disabled={isDisabled} className={cn}
      >
          {isPending ? pendingLabel : children}
      </Button>
  )
}

export default AppSubmitButton