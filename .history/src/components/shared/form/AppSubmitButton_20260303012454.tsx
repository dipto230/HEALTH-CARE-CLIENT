import React from 'react'

type AppSubmitButtonProps = {
    isPending: boolean;
    children: React.ReactNode;
    pendingLabel?: string;
    className?: string;
    
}

function AppSubmitButton() {
  return (
    <div>AppSubmitButton</div>
  )
}

export default AppSubmitButton