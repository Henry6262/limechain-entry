'use client'

import React from 'react';
import { Menu, X, LayoutDashboard, BarChart2, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { SidebarAvatar } from './sidebar-avatar';
import { SidebarNavItem } from './sidebar-nav-item';
import { MobileSidebar } from './sidebar-mobile';
import ThemeToggle from '@/components/common/theme-toggle';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '#' },
  { icon: BarChart2, label: 'Stats', href: '#' },
  { icon: Wallet, label: 'Blockchain', href: '#' },
];

export default function DashboardSidebar({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <Sidebar
        className="fixed left-0 top-0 z-40 hidden h-screen w-20 border-r border-purple-700 bg-gray-950 md:block"
      >
        <SidebarHeader className="p-4 pt-6 mb-6">
          <SidebarAvatar />
        </SidebarHeader>
        <SidebarContent className="flex flex-col items-center justify-between p-4">
          <nav className="space-y-4">
            {navItems.map((item, index) => (
              <SidebarNavItem
                key={index}
                icon={item.icon}
                label={item.label}
                href={item.href}
                onClick={() => setActiveSection(item.label)}
              />
            ))}
          </nav>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed left-4 top-4 z-50 bg-gray-950 text-white hover:bg-purple-900 md:hidden"
      >
        {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        setActiveSection={setActiveSection}
      />
    </SidebarProvider>
  );
}