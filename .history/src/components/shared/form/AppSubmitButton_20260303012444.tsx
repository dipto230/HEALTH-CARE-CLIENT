import React from 'react'

type AppSubmitButtonProps = {
    isPending: boolean;
    children: React.ReactNode;
    pendingLabel?: string;
    class
}

function AppSubmitButton() {
  return (
    <div>AppSubmitButton</div>
  )
}

export default AppSubmitButton