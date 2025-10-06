import React from 'react';
import { TrendingUp, GraduationCap, Building, UserCheck, Settings } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, userRole, sidebarOpen }) => {
  const menuItems = [
    {
      id: 'dashboard',
      icon: TrendingUp,
      label: 'Dashboard',
      roles: ['admin', 'student', 'teacher', 'institution']
    },
    {
      id: 'students',
      icon: GraduationCap,
      label: 'Students',
      roles: ['admin', 'teacher', 'institution']
    },
    {
      id: 'institutions',
      icon: Building,
      label: 'Institutions',
      roles: ['admin', 'student', 'teacher']
    },
    {
      id: 'teachers',
      icon: UserCheck,
      label: 'Faculty',
      roles: ['admin', 'student', 'institution']
    },
    {
      id: 'admin',
      icon: Settings,
      label: 'Admin Panel',
      roles: ['admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  if (!sidebarOpen) return null;

  return (
    <div className="sidebar bg-white shadow-sm" style={{ width: '280px', minHeight: 'calc(100vh - 70px)' }}>
      <div className="p-4">
        <h6 className="text-muted text-uppercase small mb-3 fw-bold">Navigation</h6>
        {filteredMenuItems.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`sidebar-item ${currentView === item.id ? 'active' : 'text-dark'}`}
              onClick={() => setCurrentView(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}

        {/* Quick Stats */}
        <div className="mt-5">
          <h6 className="text-muted text-uppercase small mb-3 fw-bold">Quick Stats</h6>
          <div className="card border-0 bg-light mb-2">
            <div className="card-body p-3">
              <small className="text-muted d-block mb-1">System Status</small>
              <div className="d-flex align-items-center">
                <div className="status-dot active me-2"></div>
                <span className="fw-bold small text-success">Operational</span>
              </div>
            </div>
          </div>
          <div className="card border-0 bg-light">
            <div className="card-body p-3">
              <small className="text-muted d-block mb-1">Last Sync</small>
              <span className="fw-bold small">Just now</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-4 p-3 bg-primary bg-opacity-10 rounded-3">
          <h6 className="fw-bold mb-2 small">Need Help?</h6>
          <p className="small text-muted mb-2">
            Check our documentation or contact support
          </p>
          <button className="btn btn-sm btn-primary w-100">
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;