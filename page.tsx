'use client'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import LeadManagement from './components/LeadManagement'
import CustomerManagement from './components/CustomerManagement'
import ResourceManagement from './components/ResourceManagement'
import TrialManagement from './components/TrialManagement'
import EventManagement from './components/EventManagement'
import SettlementManagement from './components/SettlementManagement'
import SystemManagement from './components/SystemManagement'

export type NavItem = {
  id: string
  label: string
  parent?: string
  group?: string
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('dashboard')

  const renderContent = () => {
    if (activeNav.startsWith('dash')) return <Dashboard />
    if (activeNav.startsWith('lead')) return <LeadManagement activeNav={activeNav} />
    if (activeNav.startsWith('customer') || activeNav.startsWith('contract')) return <CustomerManagement activeNav={activeNav} />
    if (activeNav.startsWith('resource')) return <ResourceManagement activeNav={activeNav} />
    if (activeNav.startsWith('trial')) return <TrialManagement activeNav={activeNav} />
    if (activeNav.startsWith('event')) return <EventManagement activeNav={activeNav} />
    if (activeNav.startsWith('settlement')) return <SettlementManagement activeNav={activeNav} />
    if (activeNav.startsWith('system')) return <SystemManagement activeNav={activeNav} />
    return <Dashboard />
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main style={{ flex: 1, overflow: 'auto', background: 'var(--bg)' }}>
        {renderContent()}
      </main>
    </div>
  )
}
