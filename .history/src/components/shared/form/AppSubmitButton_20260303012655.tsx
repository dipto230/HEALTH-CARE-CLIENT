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
    className

})=> {
  return (
    <div>AppSubmitButton</div>
  )
}

export default AppSubmitButton