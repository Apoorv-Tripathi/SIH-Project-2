import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, GraduationCap, Building, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Dashboard = () => {
  const { students, institutions, teachers, getStudentStats, getInstitutionStats, getTeacherStats } = useApp();

  const studentStats = getStudentStats();
  const institutionStats = getInstitutionStats();
  const teacherStats = getTeacherStats();

  // Student performance data
  const studentPerformance = [
    { semester: 'Sem 1', avgCGPA: 7.8 },
    { semester: 'Sem 2', avgCGPA: 8.0 },
    { semester: 'Sem 3', avgCGPA: 8.2 },
    { semester: 'Sem 4', avgCGPA: 8.4 },
    { semester: 'Sem 5', avgCGPA: 8.5 },
    { semester: 'Sem 6', avgCGPA: 8.6 }
  ];

  // Institution rankings
  const institutionRankings = institutions
    .sort((a, b) => b.nirfScore - a.nirfScore)
    .slice(0, 5)
    .map(inst => ({
      name: inst.shortName || inst.name.substring(0, 15),
      score: inst.nirfScore
    }));

  // Department distribution
  const departmentData = Object.entries(teacherStats.byDepartment || {}).map(([dept, count]) => ({
    name: dept.substring(0, 15),
    value: count
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

  return (
    <div className="animate-fade-in">
      {/* Header Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-gradient-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 opacity-75 small">Total Students</p>
                  <h2 className="mb-0 fw-bold">{studentStats.total}</h2>
                  <small className="opacity-75">Active: {studentStats.active}</small>
                </div>
                <div className="opacity-50">
                  <GraduationCap size={48} />
                </div>
              </div>
              <div className="mt-3">
                <small className="opacity-75">Avg CGPA: {studentStats.avgCGPA}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-gradient-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 opacity-75 small">Institutions</p>
                  <h2 className="mb-0 fw-bold">{institutionStats.total}</h2>
                  <small className="opacity-75">All Accredited</small>
                </div>
                <div className="opacity-50">
                  <Building size={48} />
                </div>
              </div>
              <div className="mt-3">
                <small className="opacity-75">Avg NIRF: {institutionStats.avgNIRF}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-gradient-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 opacity-75 small">Faculty Members</p>
                  <h2 className="mb-0 fw-bold">{teacherStats.total}</h2>
                  <small className="opacity-75">Across Departments</small>
                </div>
                <div className="opacity-50">
                  <Users size={48} />
                </div>
              </div>
              <div className="mt-3">
                <small className="opacity-75">Avg Rating: {teacherStats.avgRating}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-gradient-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 opacity-75 small">Publications</p>
                  <h2 className="mb-0 fw-bold">{teacherStats.avgPublications * teacherStats.total}</h2>
                  <small className="opacity-75">Research Papers</small>
                </div>
                <div className="opacity-50">
                  <Award size={48} />
                </div>
              </div>
              <div className="mt-3">
                <small className="opacity-75">Avg per Faculty: {teacherStats.avgPublications}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        {/* Student Performance Trend */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title fw-bold mb-0">Student Performance Trend</h5>
                <TrendingUp className="text-primary" size={24} />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="semester" stroke="#6b7280" />
                  <YAxis domain={[7, 9]} stroke="#6b7280" />
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
                    dataKey="avgCGPA" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    name="Average CGPA"
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-4">Faculty by Department</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Institution Rankings */}
      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-4">Top Institutions by NIRF Score</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={institutionRankings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis domain={[0, 100]} stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="score" 
                    fill="#10b981" 
                    name="NIRF Score" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Students by Course</h5>
              <div className="list-group list-group-flush">
                {Object.entries(studentStats.byCourse || {}).map(([course, count]) => (
                  <div key={course} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                    <span className="fw-medium">{course}</span>
                    <span className="badge bg-primary rounded-pill">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Recent Activity</h5>
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 px-0">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <GraduationCap className="text-success" size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-medium">New student enrolled</p>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                  </div>
                </div>
                <div className="list-group-item border-0 px-0">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                      <Building className="text-primary" size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-medium">Institution data updated</p>
                      <small className="text-muted">5 hours ago</small>
                    </div>
                  </div>
                </div>
                <div className="list-group-item border-0 px-0">
                  <div className="d-flex align-items-center">
                    <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                      <Award className="text-warning" size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-medium">New research published</p>
                      <small className="text-muted">1 day ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;