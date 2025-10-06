import React, { useState } from 'react';
import { Eye, Edit2, Trash2, Plus, Search, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const TeacherList = ({ onSelectTeacher, onEdit }) => {
  const { teachers, deleteTeacher, userRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('');

  // Get unique departments and designations
  const departments = [...new Set(teachers.map(t => t.department))];
  const designations = [...new Set(teachers.map(t => t.designation))];

  // Filter teachers
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.aparId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment = !filterDepartment || teacher.department === filterDepartment;
    const matchesDesignation = !filterDesignation || teacher.designation === filterDesignation;

    return matchesSearch && matchesDepartment && matchesDesignation;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteTeacher(id);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Faculty Directory</h3>
          <p className="text-muted mb-0">Browse all faculty members and their profiles</p>
        </div>
        {userRole === 'admin' && (
          <button className="btn btn-warning" onClick={() => onEdit(null)}>
            <Plus size={20} className="me-2" />
            Add Faculty
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <div className="position-relative">
                <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by name, APAR ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filterDesignation}
                onChange={(e) => setFilterDesignation(e.target.value)}
              >
                <option value="">All Designations</option>
                {designations.map(des => (
                  <option key={des} value={des}>{des}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchQuery('');
                  setFilterDepartment('');
                  setFilterDesignation('');
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-3">
        <p className="text-muted">
          Showing {filteredTeachers.length} of {teachers.length} faculty members
        </p>
      </div>

      {/* Teacher Cards */}
      <div className="row g-4">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="col-lg-4 col-md-6">
            <div className="card border-0 shadow-sm hover-card h-100">
              <div className="card-body">
                {/* Avatar and Name */}
                <div className="text-center mb-3">
                  <div className="avatar avatar-lg mx-auto mb-3">
                    {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <h5 className="fw-bold mb-1">{teacher.name}</h5>
                  <p className="text-muted small mb-2">{teacher.designation}</p>
                  <span className="badge bg-warning text-dark mb-2">{teacher.aparId}</span>
                  <p className="text-muted small mb-0">{teacher.department}</p>
                </div>

                {/* Stats */}
                <div className="row g-2 mb-3">
                  <div className="col-4">
                    <div className="p-2 bg-light rounded text-center">
                      <h6 className="fw-bold mb-0 small">{teacher.publications}</h6>
                      <small className="text-muted">Papers</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 bg-light rounded text-center">
                      <h6 className="fw-bold mb-0 small">{teacher.projects}</h6>
                      <small className="text-muted">Projects</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 bg-light rounded text-center">
                      <h6 className="fw-bold mb-0 small">{teacher.hIndex}</h6>
                      <small className="text-muted">H-Index</small>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">Experience</small>
                    <span className="fw-bold small">{teacher.experience} years</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: `${Math.min((teacher.experience / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Student Rating</small>
                    <div>
                      <span className="badge bg-warning text-dark">
                        ⭐ {teacher.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                {teacher.specializations && teacher.specializations.length > 0 && (
                  <div className="mb-3">
                    <small className="text-muted d-block mb-2">Specializations</small>
                    <div className="d-flex flex-wrap gap-1">
                      {teacher.specializations.slice(0, 3).map((spec, idx) => (
                        <span key={idx} className="badge bg-info small">
                          {spec.length > 15 ? spec.substring(0, 15) + '...' : spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary flex-grow-1"
                    onClick={() => onSelectTeacher(teacher)}
                  >
                    <Eye size={16} className="me-1" />
                    View Profile
                  </button>
                  {userRole === 'admin' && (
                    <>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onEdit(teacher)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(teacher.id, teacher.name)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-3">
            <UserCheck size={48} className="text-muted" />
          </div>
          <h5 className="text-muted">No faculty members found</h5>
          <p className="text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default TeacherList;