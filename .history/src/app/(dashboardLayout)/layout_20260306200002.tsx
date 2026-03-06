import React from 'react'

const RootDashboardLayout = async({children}:{children:React.ReactNode}) => {
  return (
      <div className='flex h-screen'>
          {/* dashboard sidebar */}
          <div>
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