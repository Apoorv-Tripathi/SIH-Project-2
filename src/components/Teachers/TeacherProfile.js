import React from 'react';
import { ArrowLeft, Award, BookOpen, TrendingUp, Mail, Phone, MapPin, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TeacherProfile = ({ teacher, onBack }) => {
  if (!teacher) return null;

  // Publication trend data
  const currentYear = new Date().getFullYear();
  const publicationData = [
    { year: (currentYear - 4).toString(), publications: Math.floor(teacher.publications * 0.15) },
    { year: (currentYear - 3).toString(), publications: Math.floor(teacher.publications * 0.18) },
    { year: (currentYear - 2).toString(), publications: Math.floor(teacher.publications * 0.22) },
    { year: (currentYear - 1).toString(), publications: Math.floor(teacher.publications * 0.20) },
    { year: currentYear.toString(), publications: Math.floor(teacher.publications * 0.25) }
  ];

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <button className="btn btn-link text-decoration-none mb-3 p-0" onClick={onBack}>
        <ArrowLeft size={20} className="me-2" />
        Back to Faculty
      </button>

      {/* Header Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-2">
              <div className="text-center">
                <div className="avatar avatar-lg mx-auto mb-3">
                  {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <h2 className="fw-bold mb-2">{teacher.name}</h2>
              <p className="text-muted mb-3">{teacher.designation} • {teacher.department}</p>
              
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge bg-warning text-dark">{teacher.aparId}</span>
                <span className="badge bg-primary">{teacher.experience} years experience</span>
                <span className="badge bg-success">⭐ {teacher.rating.toFixed(1)} Rating</span>
                <span className={`badge bg-${teacher.status === 'active' ? 'success' : 'secondary'}`}>
                  {teacher.status.toUpperCase()}
                </span>
              </div>

              {/* Contact Info */}
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <Mail size={18} className="text-muted me-2" />
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <p className="mb-0 small">{teacher.email}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <Phone size={18} className="text-muted me-2" />
                    <div>
                      <small className="text-muted d-block">Phone</small>
                      <p className="mb-0">{teacher.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <MapPin size={18} className="text-muted me-2" />
                    <div>
                      <small className="text-muted d-block">Office</small>
                      <p className="mb-0">{teacher.officeLocation}</p>
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
          {/* Publication Trend */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">
                <BookOpen size={20} className="me-2" />
                Publication Trend (Last 5 Years)
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={publicationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="publications" fill="#3b82f6" name="Publications" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Research Projects */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">
                <Award size={20} className="me-2" />
                Active Research Projects
              </h5>
              <div className="mb-3 p-3 bg-light rounded-3">
                <h6 className="fw-semibold mb-2">AI-Driven Healthcare Diagnostics</h6>
                <p className="text-muted small mb-2">
                  Developing machine learning models for early disease detection
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-success">Active</span>
                  <small className="text-muted">Funding: ₹50 Lakhs</small>
                </div>
              </div>
              <div className="mb-3 p-3 bg-light rounded-3">
                <h6 className="fw-semibold mb-2">Quantum Computing Applications</h6>
                <p className="text-muted small mb-2">
                  Research on quantum algorithms for optimization problems
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-success">Active</span>
                  <small className="text-muted">Funding: ₹75 Lakhs</small>
                </div>
              </div>
              <div className="p-3 bg-light rounded-3">
                <h6 className="fw-semibold mb-2">IoT in Smart Cities</h6>
                <p className="text-muted small mb-2">
                  Building intelligent systems for urban infrastructure
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-warning text-dark">In Progress</span>
                  <small className="text-muted">Funding: ₹40 Lakhs</small>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Teaching */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Courses Teaching</h5>
              <div className="row g-2">
                {teacher.courses && teacher.courses.length > 0 ? (
                  teacher.courses.map((course, idx) => (
                    <div key={idx} className="col-md-6">
                      <div className="p-3 bg-primary bg-opacity-10 rounded-3">
                        <p className="mb-0 fw-semibold text-primary">{course}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No courses assigned</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* Research Metrics */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Research Metrics</h5>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Total Publications</span>
                  <span className="fw-bold fs-4 text-primary">{teacher.publications}</span>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">H-Index</span>
                  <span className="fw-bold fs-4 text-success">{teacher.hIndex}</span>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Active Projects</span>
                  <span className="fw-bold fs-4 text-warning">{teacher.projects}</span>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Experience</span>
                  <span className="fw-bold fs-4 text-info">{teacher.experience}y</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Feedback */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">
                <Star size={20} className="me-2" />
                Student Feedback
              </h5>
              <div className="text-center mb-3">
                <h1 className="display-4 fw-bold text-warning mb-2">★ {teacher.rating.toFixed(1)}</h1>
                <p className="text-muted small mb-0">Based on 247 reviews</p>
              </div>
              <div className="mb-2">
                <small className="text-muted d-block mb-1">Teaching Quality</small>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${(teacher.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-2">
                <small className="text-muted d-block mb-1">Approachability</small>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${((teacher.rating - 0.2) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <small className="text-muted d-block mb-1">Course Content</small>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${((teacher.rating + 0.1) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Qualifications</h5>
              {teacher.qualifications && teacher.qualifications.length > 0 ? (
                teacher.qualifications.map((qual, idx) => (
                  <div key={idx} className="mb-3 pb-3 border-bottom">
                    <p className="fw-semibold mb-1">{qual.degree}</p>
                    <small className="text-muted d-block">{qual.institution}</small>
                    <small className="text-muted">{qual.year}</small>
                  </div>
                ))
              ) : (
                <p className="text-muted">No qualifications listed</p>
              )}
            </div>
          </div>

          {/* Specializations */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Specializations</h5>
              <div className="d-flex flex-wrap gap-2">
                {teacher.specializations && teacher.specializations.length > 0 ? (
                  teacher.specializations.map((spec, idx) => (
                    <span key={idx} className="badge bg-info">
                      {spec}
                    </span>
                  ))
                ) : (
                  <p className="text-muted">No specializations listed</p>
                )}
              </div>
            </div>
          </div>

          {/* Awards */}
          {teacher.awards && teacher.awards.length > 0 && (
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold mb-3">
                  <Award size={20} className="me-2" />
                  Awards & Recognition
                </h5>
                {teacher.awards.map((award, idx) => (
                  <div key={idx} className="mb-2 p-2 bg-warning bg-opacity-10 rounded">
                    <p className="mb-0 small fw-semibold text-warning">{award}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;