import React from 'react';
import { Search, LogOut, Menu, X, GraduationCap, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Navbar = ({ searchQuery, setSearchQuery, sidebarOpen, setSidebarOpen }) => {
  const { currentUser, userRole, setUserRole, logout } = useApp();

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  return (
    <nav className="navbar-custom">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Left Section */}
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-link text-dark p-0 d-lg-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="d-flex align-items-center gap-2">
              <GraduationCap size={32} className="text-primary" />
              <h4 className="mb-0 fw-bold logo-text d-none d-md-block">
                Unified Education Interface
              </h4>
              <h4 className="mb-0 fw-bold logo-text d-md-none">
                UEI
              </h4>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-grow-1 mx-4 d-none d-md-block" style={{ maxWidth: '500px' }}>
            <div className="position-relative">
              <Search
                className="position-absolute top-50 translate-middle-y ms-3 text-muted"
                size={20}
              />
              <input
                type="text"
                className="form-control search-box ps-5"
                placeholder="Search by ID or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">
            {/* Notifications */}
            <button className="btn btn-link text-dark p-0 position-relative">
              <Bell size={22} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                3
              </span>
            </button>

            {/* Role Selector */}
            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="roleDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="roleDropdown">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleRoleChange('admin')}>
                    Admin
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleRoleChange('student')}>
                    Student
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleRoleChange('teacher')}>
                    Teacher
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => handleRoleChange('institution')}>
                    Institution
                  </a>
                </li>
              </ul>
            </div>

            {/* User Profile */}
            <div className="dropdown">
              <button
                className="btn btn-link text-dark p-0 d-flex align-items-center"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="avatar me-2">
                  {currentUser?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'}
                </div>
                <span className="d-none d-md-inline">{currentUser?.fullName || 'Admin'}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item text-danger" href="#" onClick={logout}>
                    <LogOut size={16} className="me-2" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;