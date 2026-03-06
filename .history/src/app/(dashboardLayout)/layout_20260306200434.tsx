import DashboardNavbar from '@/components/modules/Dashboard/DashboardNavbar'
import React from 'react'

const RootDashboardLayout = async({children}:{children:React.ReactNode}) => {
  return (
      <div className='flex h-screen overflow-hidden'>
          {/* dashboard sidebar */}
          
          <div className='flex flex-1 flex-col overflow-hidden'>
              {/* dashboardNavbar */}
              <DashboardNavbar/>
              <main className='flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6'>
                  <div>
                    {children}
                  </div>
              </main>
          </div>
    </div>
  )
}

export default RootDashboardLayout