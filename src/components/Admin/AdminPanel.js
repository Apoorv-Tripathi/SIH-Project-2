import React from 'react';
import { Plus, Edit2, Trash2, TrendingUp, Users, FileText, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AdminPanel = () => {
  const { students, institutions, teachers, getStudentStats, getInstitutionStats, getTeacherStats } = useApp();

  const studentStats = getStudentStats();
  const institutionStats = getInstitutionStats();
  const teacherStats = getTeacherStats();

  return (
    <div className="animate-fade-in">
      <h3 className="fw-bold mb-4">Admin Control Panel</h3>

      {/* Quick Actions */}
      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                  <Users className="text-primary" size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Manage Students</h5>
                  <small className="text-muted">Add, edit, or remove student records</small>
                </div>
              </div>
              <button className="btn btn-primary w-100 mb-2">
                <Plus size={18} className="me-2" />
                Add New Student
              </button>
              <button className="btn btn-outline-secondary w-100 mb-2">
                <Edit2 size={18} className="me-2" />
                Bulk Edit
              </button>
              <button className="btn btn-outline-danger w-100">
                <Trash2 size={18} className="me-2" />
                Bulk Delete
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                  <Users className="text-success" size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Manage Institutions</h5>
                  <small className="text-muted">Update institution data and compliance</small>
                </div>
              </div>
              <button className="btn btn-success w-100 mb-2">
                <Plus size={18} className="me-2" />
                Add Institution
              </button>
              <button className="btn btn-outline-secondary w-100 mb-2">
                <Edit2 size={18} className="me-2" />
                Update Records
              </button>
              <button className="btn btn-outline-warning w-100">
                <Settings size={18} className="me-2" />
                Configure
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                  <Users className="text-warning" size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0">Manage Faculty</h5>
                  <small className="text-muted">Handle faculty records and performance</small>
                </div>
              </div>
              <button className="btn btn-warning w-100 mb-2">
                <Plus size={18} className="me-2" />
                Add Faculty
              </button>
              <button className="btn btn-outline-secondary w-100 mb-2">
                <Edit2 size={18} className="me-2" />
                Edit Profile
              </button>
              <button className="btn btn-outline-info w-100">
                <TrendingUp size={18} className="me-2" />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Statistics */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-4">System Statistics</h5>
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 bg-primary bg-opacity-10 rounded">
                    <p className="text-muted small mb-1">Total Records</p>
                    <h4 className="fw-bold mb-0">{students.length + institutions.length + teachers.length}</h4>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-success bg-opacity-10 rounded">
                    <p className="text-muted small mb-1">Active Users</p>
                    <h4 className="fw-bold mb-0">487</h4>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-warning bg-opacity-10 rounded">
                    <p className="text-muted small mb-1">Pending Approvals</p>
                    <h4 className="fw-bold mb-0">23</h4>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-info bg-opacity-10 rounded">
                    <p className="text-muted small mb-1">System Health</p>
                    <h4 className="fw-bold mb-0 text-success">Good</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Recent Activities</h5>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                    <Plus className="text-success" size={18} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="small mb-0 fw-medium">New student record added</p>
                    <small className="text-muted">5 minutes ago</small>
                  </div>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                    <Edit2 className="text-info" size={18} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="small mb-0 fw-medium">Institution data updated</p>
                    <small className="text-muted">1 hour ago</small>
                  </div>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                    <FileText className="text-warning" size={18} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="small mb-0 fw-medium">Faculty profile modified</p>
                    <small className="text-muted">3 hours ago</small>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                    <TrendingUp className="text-primary" size={18} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="small mb-0 fw-medium">Bulk import completed</p>
                    <small className="text-muted">1 day ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Student Overview</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Total Students</span>
                <span className="fw-bold">{studentStats.total}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Average CGPA</span>
                <span className="fw-bold">{studentStats.avgCGPA}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Active Status</span>
                <span className="badge bg-success">{studentStats.active}</span>
              </div>
              <hr />
              <h6 className="fw-bold mb-2 small">By Course</h6>
              {Object.entries(studentStats.byCourse || {}).slice(0, 3).map(([course, count]) => (
                <div key={course} className="d-flex justify-content-between align-items-center mb-1">
                  <small className="text-muted">{course}</small>
                  <span className="badge bg-primary">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Institution Overview</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Total Institutions</span>
                <span className="fw-bold">{institutionStats.total}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Avg NIRF Score</span>
                <span className="fw-bold">{institutionStats.avgNIRF}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Avg Compliance</span>
                <span className="badge bg-success">{institutionStats.avgCompliance}%</span>
              </div>
              <hr />
              <h6 className="fw-bold mb-2 small">Top Ranked</h6>
              {institutionStats.topRanked?.slice(0, 3).map((inst, idx) => (
                <div key={inst.id} className="d-flex justify-content-between align-items-center mb-1">
                  <small className="text-muted">#{inst.ranking} {inst.shortName || inst.name.substring(0, 15)}</small>
                  <span className="badge bg-success">{inst.nirfScore}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Faculty Overview</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Total Faculty</span>
                <span className="fw-bold">{teacherStats.total}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Avg Publications</span>
                <span className="fw-bold">{teacherStats.avgPublications}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Avg Rating</span>
                <span className="badge bg-warning text-dark">⭐ {teacherStats.avgRating}</span>
              </div>
              <hr />
              <h6 className="fw-bold mb-2 small">By Department</h6>
              {Object.entries(teacherStats.byDepartment || {}).slice(0, 3).map(([dept, count]) => (
                <div key={dept} className="d-flex justify-content-between align-items-center mb-1">
                  <small className="text-muted">{dept.substring(0, 20)}</small>
                  <span className="badge bg-warning text-dark">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            <Settings size={20} className="me-2" />
            System Settings
          </h5>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="autoBackup" defaultChecked />
                <label className="form-check-label" htmlFor="autoBackup">
                  Enable automatic backup
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="emailNotif" defaultChecked />
                <label className="form-check-label" htmlFor="emailNotif">
                  Email notifications
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="dataValidation" defaultChecked />
                <label className="form-check-label" htmlFor="dataValidation">
                  Data validation on import
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="auditLog" defaultChecked />
                <label className="form-check-label" htmlFor="auditLog">
                  Maintain audit logs
                </label>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex gap-2">
            <button className="btn btn-primary">
              <FileText size={18} className="me-2" />
              Export All Data
            </button>
            <button className="btn btn-success">
              <Plus size={18} className="me-2" />
              Import Data
            </button>
            <button className="btn btn-outline-secondary">
              <Settings size={18} className="me-2" />
              Advanced Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;