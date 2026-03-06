import { getUserInfo } from '@/services/auth.services'
import React from 'react'

const DashboardNavbar = async() => {
  const userInfo = await getUserInfo()
    const navItems : NavSection[] = getNavItemsByRole(userInfo.role)
  
    const dashboardHome = getDefaultDashboardRoute(userInfo.role)
  return (
    <div>DashboardNavbar</div>
  )
}

export default DashboardNavbar