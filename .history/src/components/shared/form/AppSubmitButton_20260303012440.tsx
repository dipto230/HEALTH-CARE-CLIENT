import React from 'react'

type AppSubmitButtonProps = {
    isPending: boolean;
    children: React.ReactNode;
    pendingLabel?: string;
    
}

function AppSubmitButton() {
  return (
    <div>AppSubmitButton</div>
  )
}

export default AppSubmitButton