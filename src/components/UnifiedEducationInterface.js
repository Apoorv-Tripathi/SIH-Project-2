import React, { useState } from 'react';
import Navbar from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import StudentList from './Students/StudentList';
import StudentProfile from './Students/StudentProfile';
import InstitutionList from './Institutions/InstitutionList';
import InstitutionProfile from './Institutions/InstitutionProfile';
import TeacherList from './Teachers/TeacherList';
import TeacherProfile from './Teachers/TeacherProfile';
import AdminPanel from './Admin/AdminPanel';
import { useApp } from '../context/AppContext';

const UnifiedEducationInterface = () => {
  const { userRole } = useApp();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    // Student views
    if (selectedStudent) {
      return (
        <StudentProfile
          student={selectedStudent}
          onBack={() => setSelectedStudent(null)}
        />
      );
    }

    // Institution views
    if (selectedInstitution) {
      return (
        <InstitutionProfile
          institution={selectedInstitution}
          onBack={() => setSelectedInstitution(null)}
        />
      );
    }

    // Teacher views
    if (selectedTeacher) {
      return (
        <TeacherProfile
          teacher={selectedTeacher}
          onBack={() => setSelectedTeacher(null)}
        />
      );
    }

    // Main views
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return (
          <StudentList
            onSelectStudent={setSelectedStudent}
            onEdit={(student) => console.log('Edit student:', student)}
          />
        );
      case 'institutions':
        return (
          <InstitutionList
            onSelectInstitution={setSelectedInstitution}
            onEdit={(institution) => console.log('Edit institution:', institution)}
          />
        );
      case 'teachers':
        return (
          <TeacherList
            onSelectTeacher={setSelectedTeacher}
            onEdit={(teacher) => console.log('Edit teacher:', teacher)}
          />
        );
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="d-flex">
        <Sidebar
          currentView={currentView}
          setCurrentView={(view) => {
            setCurrentView(view);
            setSelectedStudent(null);
            setSelectedInstitution(null);
            setSelectedTeacher(null);
          }}
          userRole={userRole}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex-grow-1 p-4">
          <div className="container-fluid">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedEducationInterface;