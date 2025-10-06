import React, { useState } from 'react';
import { Eye, Edit2, Trash2, Plus, Search, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getComplianceStatus } from '../../utils/helpers';

const InstitutionList = ({ onSelectInstitution, onEdit }) => {
  const { institutions, deleteInstitution, userRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAccreditation, setFilterAccreditation] = useState('');

  // Get unique accreditations
  const accreditations = [...new Set(institutions.map(i => i.accreditation))];

  // Filter institutions
  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch =
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.aisheCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.city?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAccreditation = !filterAccreditation || institution.accreditation === filterAccreditation;

    return matchesSearch && matchesAccreditation;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteInstitution(id);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Institution Directory</h3>
          <p className="text-muted mb-0">Browse all registered educational institutions</p>
        </div>
        {userRole === 'admin' && (
          <button className="btn btn-success" onClick={() => onEdit(null)}>
            <Plus size={20} className="me-2" />
            Add Institution
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
                  placeholder="Search by name, AISHE code, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filterAccreditation}
                onChange={(e) => setFilterAccreditation(e.target.value)}
              >
                <option value="">All Accreditations</option>
                {accreditations.map(acc => (
                  <option key={acc} value={acc}>{acc}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchQuery('');
                  setFilterAccreditation('');
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
          Showing {filteredInstitutions.length} of {institutions.length} institutions
        </p>
      </div>

      {/* Institution Cards */}
      <div className="row g-4">
        {filteredInstitutions.map(institution => {
          const complianceStatus = getComplianceStatus(institution.compliance);
          
          return (
            <div key={institution.id} className="col-lg-6">
              <div className="card border-0 shadow-sm hover-card h-100">
                <div className="card-body">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-start mb-2">
                        <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                          <Building className="text-success" size={20} />
                        </div>
                        <div>
                          <h5 className="fw-bold mb-1">{institution.name}</h5>
                          <p className="text-muted small mb-2">
                            {institution.city}, {institution.state}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-primary">{institution.aisheCode}</span>
                        <span className="badge bg-info">{institution.accreditation}</span>
                        <span className="badge bg-secondary">{institution.type}</span>
                      </div>
                    </div>
                    <div className="text-end ms-3">
                      <div className="bg-success bg-opacity-10 rounded-3 p-2">
                        <h4 className="fw-bold text-success mb-0">{institution.nirfScore}</h4>
                        <small className="text-muted">NIRF</small>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="row g-2 mb-3">
                    <div className="col-4">
                      <div className="p-2 bg-light rounded text-center">
                        <small className="text-muted d-block">Ranking</small>
                        <p className="fw-bold mb-0">#{institution.ranking}</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 bg-light rounded text-center">
                        <small className="text-muted d-block">Students</small>
                        <p className="fw-bold mb-0">{(institution.students / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 bg-light rounded text-center">
                        <small className="text-muted d-block">Faculty</small>
                        <p className="fw-bold mb-0">{institution.faculty}</p>
                      </div>
                    </div>
                  </div>

                  {/* Compliance */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">Compliance Score</small>
                      <span className={`badge bg-${complianceStatus.color}`}>
                        {complianceStatus.text}
                      </span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div
                        className={`progress-bar bg-${complianceStatus.color}`}
                        style={{ width: `${institution.compliance}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">{institution.compliance}%</small>
                  </div>

                  {/* Additional Info */}
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block">Projects</small>
                      <p className="fw-medium mb-0">{institution.projects}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Departments</small>
                      <p className="fw-medium mb-0">{institution.departments}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Established</small>
                      <p className="fw-medium mb-0">{institution.established}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Placement</small>
                      <p className="fw-medium mb-0">{institution.placementRate}%</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary flex-grow-1"
                      onClick={() => onSelectInstitution(institution)}
                    >
                      <Eye size={16} className="me-1" />
                      View Details
                    </button>
                    {userRole === 'admin' && (
                      <>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => onEdit(institution)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(institution.id, institution.name)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredInstitutions.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-3">
            <Building size={48} className="text-muted" />
          </div>
          <h5 className="text-muted">No institutions found</h5>
          <p className="text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default InstitutionList;