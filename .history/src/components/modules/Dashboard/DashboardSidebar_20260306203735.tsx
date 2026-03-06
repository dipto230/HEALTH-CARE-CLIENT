import React from 'react'

const DashboardSidebar = () => {
     const userInfo = await getUserInfo()
  const navItems : NavSection[] = getNavItemsByRole(userInfo.role)

  const dashboardHome = getDefaultDashboardRoute(userInfo.role)
  return (
    <div>DashboardSidebar</div>
  )
}

export default DashboardSidebar