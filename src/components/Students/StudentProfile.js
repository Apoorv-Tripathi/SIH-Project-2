import React from 'react';
import { ArrowLeft, Award, BookOpen, TrendingUp, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGradeColor, formatDate } from '../../utils/helpers';

const StudentProfile = ({ student, onBack }) => {
  if (!student) return null;

  // Prepare grade data for chart
  const gradeData = student.grades.map((grade, idx) => ({
    semester: `Sem ${idx + 1}`,
    grade: grade,
    target: 8.5
  }));

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <button className="btn btn-link text-decoration-none mb-3 p-0" onClick={onBack}>
        <ArrowLeft size={20} className="me-2" />
        Back to Students
      </button>

      {/* Header Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-8">
              {/* Avatar */}
              <div className="d-flex align-items-start mb-4">
                <div className="avatar avatar-lg me-3">
                  {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h2 className="fw-bold mb-2">{student.name}</h2>
                  <p className="text-muted mb-2">{student.course}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-primary">{student.apaarId}</span>
                    <span className="badge bg-success">Semester {student.semester}</span>
                    <span className={`badge bg-${student.status === 'active' ? 'success' : 'secondary'}`}>
                      {student.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <Mail size={18} className="text-muted me-2" />
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <p className="mb-0">{student.email}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <Phone size={18} className="text-muted me-2" />
                    <div>
                      <small className="text-muted d-block">Phone</small>
                      <p className="mb-0">{student.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <MapPin size={18} className="text-muted me-2" />
                    <div>
                      <small className="text-muted d-block">Address</small>
                      <p className="mb-0">{student.address}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <Calendar size={18} className="text-muted me-2" />
                    <div>
                      <small className="text-muted d-block">Enrollment Year</small>
                      <p className="mb-0">{student.enrollmentYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-light rounded-3 p-4 mb-3">
                  <h1 className={`display-3 fw-bold text-${getGradeColor(student.cgpa)} mb-2`}>
                    {student.cgpa}
                  </h1>
                  <p className="text-muted mb-2">Current CGPA</p>
                  <div className="d-flex justify-content-center align-items-center">
                    <TrendingUp size={16} className="text-success me-1" />
                    <small className="text-success fw-bold">
                      +{((student.grades[student.grades.length - 1] - student.grades[0]) || 0).toFixed(2)} from Sem 1
                    </small>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="p-2 bg-primary bg-opacity-10 rounded">
                      <h5 className="fw-bold text-primary mb-0">{student.semester}</h5>
                      <small className="text-muted">Semester</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-success bg-opacity-10 rounded">
                      <h5 className="fw-bold text-success mb-0">{student.attendance}%</h5>
                      <small className="text-muted">Attendance</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-8">
          {/* Academic Progress Chart */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">
                <BookOpen size={20} className="me-2" />
                Academic Progress
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="semester" stroke="#6b7280" />
                  <YAxis domain={[6, 10]} stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="grade"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="CGPA"
                    dot={{ fill: '#3b82f6', r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">
                <Award size={20} className="me-2" />
                Achievements & Awards
              </h5>
              {student.achievements && student.achievements.length > 0 ? (
                <div className="row g-3">
                  {student.achievements.map((achievement, idx) => (
                    <div key={idx} className="col-12">
                      <div className="d-flex align-items-center p-3 bg-light rounded-3">
                        <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                          <Award className="text-warning" size={24} />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold">{achievement}</p>
                          <small className="text-muted">2024</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-3">No achievements recorded yet</p>
              )}
            </div>
          </div>

          {/* Grade History Table */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Semester-wise Performance</h5>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Semester</th>
                      <th>Grade</th>
                      <th>Performance</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.grades.map((grade, idx) => (
                      <tr key={idx}>
                        <td className="fw-medium">Semester {idx + 1}</td>
                        <td>
                          <span className={`badge bg-${getGradeColor(grade)}`}>
                            {grade.toFixed(2)}
                          </span>
                        </td>
                        <td>
                          <div className="progress" style={{ height: '8px', width: '100px' }}>
                            <div
                              className={`progress-bar bg-${getGradeColor(grade)}`}
                              style={{ width: `${(grade / 10) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td>
                          {grade >= 8.5 ? (
                            <span className="text-success">Excellent</span>
                          ) : grade >= 7.5 ? (
                            <span className="text-primary">Good</span>
                          ) : grade >= 6.5 ? (
                            <span className="text-warning">Average</span>
                          ) : (
                            <span className="text-danger">Below Average</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* Active Schemes */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Active Scholarship Schemes</h5>
              {student.schemes && student.schemes.length > 0 ? (
                student.schemes.map((scheme, idx) => (
                  <div key={idx} className="mb-3 p-3 bg-success bg-opacity-10 rounded-3">
                    <div className="d-flex align-items-start">
                      <div className="bg-success rounded-circle p-2 me-2">
                        <Award size={16} className="text-white" />
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1 fw-semibold text-success">{scheme}</p>
                        <small className="text-muted">Status: Active</small>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center py-3">No active schemes</p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Performance Metrics</h5>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">Attendance Rate</small>
                  <span className="fw-bold">{student.attendance}%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className={`progress-bar ${student.attendance >= 90 ? 'bg-success' : student.attendance >= 75 ? 'bg-warning' : 'bg-danger'}`}
                    style={{ width: `${student.attendance}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">Assignment Completion</small>
                  <span className="fw-bold">{student.assignmentCompletion}%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className={`progress-bar bg-info`}
                    style={{ width: `${student.assignmentCompletion}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">Course Progress</small>
                  <span className="fw-bold">{((student.semester / 8) * 100).toFixed(0)}%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${(student.semester / 8) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Additional Information</h5>
              <div className="mb-3">
                <small className="text-muted d-block mb-1">Aadhar Number</small>
                <p className="fw-medium mb-0">{student.aadhar}</p>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block mb-1">APAAR ID</small>
                <p className="fw-medium mb-0">{student.apaarId}</p>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block mb-1">Enrollment Year</small>
                <p className="fw-medium mb-0">{student.enrollmentYear}</p>
              </div>
              <div>
                <small className="text-muted d-block mb-1">Account Status</small>
                <span className={`badge bg-${student.status === 'active' ? 'success' : 'secondary'}`}>
                  {student.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;