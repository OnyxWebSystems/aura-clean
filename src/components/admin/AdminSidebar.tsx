import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  MessageSquare,
  LogOut,
  Home,
} from 'lucide-react';

interface AdminSidebarProps {
  user: any;
  currentSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'services', label: 'Services', icon: FileText },
];

export default function AdminSidebar({
  user,
  currentSection,
  onSectionChange,
  onLogout,
}: AdminSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link to={createPageUrl('Home')} className="flex items-center gap-3" aria-label="Go to home page">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <div>
            <span className="text-lg font-semibold text-[#1a1a2e]">Pristine & Co.</span>
            <span className="block text-xs text-gray-500">Admin Portal</span>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 mx-4 my-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center"
            aria-label={`${user?.full_name || user?.email} avatar`}
          >
            <span className="text-white font-medium">
              {user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-[#1a1a2e] truncate">{user?.full_name || 'Admin'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2" aria-label="Admin navigation">
        <ul className="space-y-1" role="list">
          {menuItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Link to={createPageUrl('Home')}>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
            aria-label="Go to website"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            <span className="font-medium">Back to Website</span>
          </button>
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
          aria-label="Sign out"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

