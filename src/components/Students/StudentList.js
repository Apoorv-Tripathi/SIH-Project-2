import React, { useState } from 'react';
import { Eye, Edit2, Trash2, Plus, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getGradeColor } from '../../utils/helpers';

const StudentList = ({ onSelectStudent, onEdit }) => {
  const { students, deleteStudent, userRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  // Get unique courses
  const courses = [...new Set(students.map(s => s.course))];

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.apaarId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = !filterCourse || student.course === filterCourse;
    
    return matchesSearch && matchesCourse;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteStudent(id);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Student Records</h3>
          <p className="text-muted mb-0">Manage and view all student profiles</p>
        </div>
        {userRole === 'admin' && (
          <button className="btn btn-primary" onClick={() => onEdit(null)}>
            <Plus size={20} className="me-2" />
            Add Student
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="position-relative">
                <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by name, APAAR ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchQuery('');
                  setFilterCourse('');
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
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </div>

      {/* Student Cards */}
      <div className="row g-4">
        {filteredStudents.map(student => (
          <div key={student.id} className="col-lg-6 col-xl-4">
            <div className="card border-0 shadow-sm hover-card h-100">
              <div className="card-body">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="flex-grow-1">
                    <h5 className="fw-bold mb-2">{student.name}</h5>
                    <p className="text-muted small mb-2">
                      {student.course} • Semester {student.semester}
                    </p>
                    <span className="badge bg-primary">{student.apaarId}</span>
                  </div>
                  <div className="text-end">
                    <div className={`badge bg-${getGradeColor(student.cgpa)} fs-5 px-3 py-2`}>
                      {student.cgpa}
                    </div>
                    <small className="d-block text-muted mt-1">CGPA</small>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted">Academic Progress</small>
                    <small className="fw-bold">{((student.cgpa / 10) * 100).toFixed(0)}%</small>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className={`progress-bar bg-${getGradeColor(student.cgpa)}`}
                      style={{ width: `${(student.cgpa / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="p-2 bg-light rounded">
                      <small className="text-muted d-block">Attendance</small>
                      <p className="fw-bold mb-0 small">{student.attendance}%</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-light rounded">
                      <small className="text-muted d-block">Assignments</small>
                      <p className="fw-bold mb-0 small">{student.assignmentCompletion}%</p>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                {student.achievements && student.achievements.length > 0 && (
                  <div className="mb-3">
                    <small className="text-muted d-block mb-2">Recent Achievements</small>
                    <div className="d-flex flex-wrap gap-1">
                      {student.achievements.slice(0, 2).map((achievement, idx) => (
                        <span key={idx} className="badge bg-light text-dark small">
                          {achievement.length > 20 ? achievement.substring(0, 20) + '...' : achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schemes */}
                {student.schemes && student.schemes.length > 0 && (
                  <div className="mb-3">
                    <small className="text-muted d-block mb-2">Active Schemes</small>
                    <div className="d-flex flex-wrap gap-1">
                      {student.schemes.map((scheme, idx) => (
                        <span key={idx} className="badge bg-success small">
                          {scheme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="d-flex gap-2 mt-3">
                  <button 
                    className="btn btn-sm btn-outline-primary flex-grow-1"
                    onClick={() => onSelectStudent(student)}
                  >
                    <Eye size={16} className="me-1" />
                    View Details
                  </button>
                  {userRole === 'admin' && (
                    <>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onEdit(student)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(student.id, student.name)}
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
      {filteredStudents.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-3">
            <Search size={48} className="text-muted" />
          </div>
          <h5 className="text-muted">No students found</h5>
          <p className="text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default StudentList;