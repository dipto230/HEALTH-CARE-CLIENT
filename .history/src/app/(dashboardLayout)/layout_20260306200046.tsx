import React from 'react'

const RootDashboardLayout = async({children}:{children:React.ReactNode}) => {
  return (
      <div className='flex h-screen overflow-hidden'>
          {/* dashboard sidebar */}
          <div className='flex flex-1 flex-col overflow-hidden'>
              {/* dashboardNavbar */}
              <main>
                  <div>
                    {children}
                  </div>
              </main>
          </div>
    </div>
  )
}

export default RootDashboardLayout