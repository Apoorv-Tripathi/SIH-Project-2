import React from 'react';
import { ArrowLeft, Building, Award, Users, BookOpen, TrendingUp, MapPin, Globe, Phone, Mail } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getComplianceStatus } from '../../utils/helpers';

const InstitutionProfile = ({ institution, onBack }) => {
  if (!institution) return null;

  const complianceStatus = getComplianceStatus(institution.compliance);

  // Performance metrics for radar chart
  const metricsData = [
    { metric: 'Teaching', score: institution.nirfScore - 5 },
    { metric: 'Research', score: institution.nirfScore },
    { metric: 'Placements', score: institution.placementRate || 88 },
    { metric: 'Infrastructure', score: institution.compliance },
    { metric: 'Innovation', score: (institution.projects / 5) || 85 }
  ];

  // Department data
  const departmentData = [
    { name: 'Engineering', students: Math.floor(institution.students * 0.4) },
    { name: 'Science', students: Math.floor(institution.students * 0.25) },
    { name: 'Management', students: Math.floor(institution.students * 0.2) },
    { name: 'Humanities', students: Math.floor(institution.students * 0.15) }
  ];

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <button className="btn btn-link text-decoration-none mb-3 p-0" onClick={onBack}>
        <ArrowLeft size={20} className="me-2" />
        Back to Institutions
      </button>

      {/* Header Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-8">
              {/* Logo and Name */}
              <div className="d-flex align-items-start mb-4">
                <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                  <Building className="text-success" size={32} />
                </div>
                <div>
                  <h2 className="fw-bold mb-2">{institution.name}</h2>
                  <p className="text-muted mb-2">{institution.shortName || institution.name}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-primary">{institution.aisheCode}</span>
                    <span className="badge bg-info">{institution.accreditation}</span>
                    <span className="badge bg-secondary">{institution.type}</span>
                    <span className={`badge bg-${institution.status === 'active' ? 'success' : 'secondary'}`}>
                      {institution.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <MapPin size={18} className="text-muted me-2 mt-1" />
                    <div>
                      <small className="text-muted d-block">Address</small>
                      <p className="mb-0">{institution.city}, {institution.state}</p>
                      {institution.pincode && <small className="text-muted">{institution.pincode}</small>}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <Phone size={18} className="text-muted me-2 mt-1" />
                    <div>
                      <small className="text-muted d-block">Phone</small>
                      <p className="mb-0">{institution.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <Mail size={18} className="text-muted me-2 mt-1" />
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <p className="mb-0">{institution.email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <Globe size={18} className="text-muted me-2 mt-1" />
                    <div>
                      <small className="text-muted d-block">Website</small>
                      <a href={institution.website} target="_blank" rel="noopener noreferrer" className="text-primary">
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              {/* NIRF Score */}
              <div className="bg-success bg-opacity-10 rounded-3 p-4 text-center mb-3">
                <h1 className="display-3 fw-bold text-success mb-2">{institution.nirfScore}</h1>
                <p className="text-muted mb-2">NIRF Score</p>
                <div className="d-flex justify-content-center align-items-center">
                  <TrendingUp size={16} className="text-success me-1" />
                  <small className="text-success fw-bold">Rank #{institution.ranking}</small>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="row g-2">
                <div className="col-6">
                  <div className="p-2 bg-primary bg-opacity-10 rounded text-center">
                    <h6 className="fw-bold text-primary mb-0">{institution.departments}</h6>
                    <small className="text-muted">Departments</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 bg-warning bg-opacity-10 rounded text-center">
                    <h6 className="fw-bold text-warning mb-0">{institution.established}</h6>
                    <small className="text-muted">Est. Year</small>
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
          {/* Performance Metrics */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">
                <Award size={20} className="me-2" />
                Performance Metrics
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={metricsData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                  <PolarRadiusAxis domain={[0, 100]} stroke="#6b7280" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">
                <BookOpen size={20} className="me-2" />
                Student Distribution by Department
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="students" fill="#3b82f6" name="Students" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Key Statistics</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 bg-primary bg-opacity-10 rounded-3 text-center">
                    <Users className="text-primary mb-2" size={32} />
                    <h4 className="fw-bold mb-1">{institution.students.toLocaleString()}</h4>
                    <small className="text-muted">Total Students</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-success bg-opacity-10 rounded-3 text-center">
                    <Users className="text-success mb-2" size={32} />
                    <h4 className="fw-bold mb-1">{institution.faculty}</h4>
                    <small className="text-muted">Faculty Members</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-warning bg-opacity-10 rounded-3 text-center">
                    <BookOpen className="text-warning mb-2" size={32} />
                    <h4 className="fw-bold mb-1">{institution.projects}</h4>
                    <small className="text-muted">Active Projects</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* Compliance Score */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Compliance Score</h5>
              <div className="text-center mb-3">
                <div className="position-relative d-inline-block">
                  <svg width="150" height="150">
                    <circle cx="75" cy="75" r="60" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle
                      cx="75"
                      cy="75"
                      r="60"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray={`${(institution.compliance / 100) * 377} 377`}
                      strokeLinecap="round"
                      transform="rotate(-90 75 75)"
                    />
                  </svg>
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <h2 className="fw-bold text-success mb-0">{institution.compliance}%</h2>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <span className={`badge bg-${complianceStatus.color} px-3 py-2`}>
                  {complianceStatus.text}
                </span>
              </div>
              <p className="text-center text-muted small mt-2">
                All regulatory requirements met
              </p>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Additional Metrics</h5>
              
              <div className="mb-3">
                <small className="text-muted d-block mb-2">Research Output</small>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                    <div
                      className="progress-bar bg-info"
                      style={{ width: `${(institution.researchOutput / 10) || 85}%` }}
                    ></div>
                  </div>
                  <span className="fw-bold small">{institution.researchOutput || 850}</span>
                </div>
              </div>

              <div className="mb-3">
                <small className="text-muted d-block mb-2">Placement Rate</small>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${institution.placementRate || 90}%` }}
                    ></div>
                  </div>
                  <span className="fw-bold small">{institution.placementRate || 90}%</span>
                </div>
              </div>

              <div>
                <small className="text-muted d-block mb-2">Student Satisfaction</small>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                  <span className="fw-bold small">92%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Recent Updates</h5>
              <div className="mb-3 pb-3 border-bottom">
                <p className="small fw-semibold mb-1">New Research Lab Inaugurated</p>
                <small className="text-muted">2 days ago</small>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <p className="small fw-semibold mb-1">MoU Signed with Industry Partner</p>
                <small className="text-muted">1 week ago</small>
              </div>
              <div>
                <p className="small fw-semibold mb-1">Campus Expansion Announced</p>
                <small className="text-muted">2 weeks ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {institution.description && (
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">About</h5>
            <p className="text-muted">{institution.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionProfile;